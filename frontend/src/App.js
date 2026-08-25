//Import React Elements
import * as React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
//Import css
import "./css/App.css";

//Import components
import Header from "./components/Header";
import Info from "./components/Info";
import CharacterList from "./components/CharacterList";
import Main from "./components/Main";
import CookiePopup from "./components/CookiePopup";
import Cookies from "./components/Cookies";
import InfoModal from "./components/InfoModal";
import { getCharacterList } from "./data/staticData";

const basename = window.location.hostname.endsWith("github.io")
  ? `/${window.location.pathname.split("/").filter(Boolean)[0] || ""}`
  : undefined;

class App extends React.Component {
  constructor() {
    super();

    //State
    this.state = {
      characterData: undefined,

      //Contains data for a specific hitbox, for use when displaying all data about a hitbox
      hitboxData: undefined,

      //Values for sorting/filtering the character list
      search: "",

      //All settings
      settings: {
        showAllHitboxData: true,
        damageMultiplier: false,
        showExtraInfo: true,
        dark_light: 0,
        defaultPlaySpeed: 2,
        loopMove: true,
        useHighResImages: false,
        sortBy: "number",
        cookiesEnabled: false,
      },

      cookieMessage: true,

      //Simple toast shown briefly after an action like copying a share link
      toastMessage: "",
      toastVisible: false,
    };

    //Bind functions so they are usable within components
    this.changeSortBy = this.changeSortBy.bind(this);
    this.changeSearchValue = this.changeSearchValue.bind(this);
    this.setInitialSettings = this.setInitialSettings.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.changeMove = this.changeMove.bind(this);
    this.urlNotification = this.urlNotification.bind(this);
  }

  //Update the value to sort by in the character select
  changeSortBy(value) {
    this.setState({
      sortBy: value.target.id,
    });
  }

  //Update the search value to filter by in the character select
  changeSearchValue(value) {
    this.setState({
      search: value.target.value,
    });
  }

  //Set initial settings on a page load
  setInitialSettings() {
    //Attempt to parse the cookie and use the values acquired to change the settings
    try {
      let match = document.cookie.split("; ").find((row) => row.startsWith("settings="));
      let settings = JSON.parse(match.slice("settings=".length));

      if (settings.loopMove === undefined) {
        settings.loopMove = true;
      }
      if (settings.cookiesEnabled) {
        this.setState({
          cookieMessage: false,
        });
      }
      this.setState({
        settings: settings,
        playSpeed: settings.defaultPlaySpeed,
      });
    } catch {
      //No cookie available or cookie is unreadable, use the default settings and reset cookie
    }
  }

  changeSettings(settings, displayCookieMessage) {
    console.log(settings);
    if (this.state.settings !== settings) {
      this.setState({
        settings: settings,
      });
    }
    if (displayCookieMessage === false) {
      this.setState({
        cookieMessage: false,
      });
    }
    if (settings.cookiesEnabled) {
      let expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      document.cookie =
        "settings=" +
        JSON.stringify(settings) +
        "; Expires=" +
        expiryDate.toUTCString() +
        "; path=/";
    }
  }

  //When the site initially loads, always get all character data
  componentDidMount() {
    this.setInitialSettings();

    this.setState({
      characterData: getCharacterList(),
    });
  }

  changeMove(event) {
    this.setState({
      redirectMove: event.target.value,
    });
  }

  urlNotification() {
    clearTimeout(this.toastTimeout);
    this.setState({ toastMessage: "URL copied to clipboard", toastVisible: true });
    this.toastTimeout = setTimeout(() => {
      this.setState({ toastVisible: false });
    }, 2000);
  }

  //Call components to render the page
  render() {
    ////This extends the background color to the whole screen
    let pageBg = this.state.settings.dark_light === 0 ? "#111318" : "#F6F6F8";
    document.body.style.backgroundColor = pageBg;
    document.documentElement.style.setProperty("--pageBg", pageBg);

    if (this.state.characterData === undefined) {
      return null;
    } else {
      return (
        <div
          id="App"
          className={
            this.state.settings.dark_light === 0 ? "app-light" : "app-dark"
          }
        >
          <div id="toast" className={this.state.toastVisible ? "fadeIn" : "fadeOut"}>
            {this.state.toastMessage}
          </div>
          <InfoModal dark_light={this.state.settings.dark_light} />
          <Router basename={basename}>
            <Header
              settings={this.state.settings}
              changeSettings={this.changeSettings}
            />

            <Switch>
              <Route
                path="/info"
                render={() => (
                  <Info dark_light={this.state.settings.dark_light} />
                )}
              />

              <Redirect from="/settings" to="/" />

              <Route
                path={["/"]}
                exact
                render={() => (
                  <div>
                    <div className="info homeIntro">
                      Check out hundreds of moves from Smash Ultimate at various
                      speeds and view in depth details on every hitbox related
                      to each move!{" "}
                    </div>
                    <CharacterList
                      characterListData={this.state.characterData}
                      updateCurrentCharacter={this.updateCurrentCharacter}
                      getCharacterData={this.getCharacterData}
                      search={this.state.search}
                      changeSearchValue={this.changeSearchValue}
                      setInitialSettings={this.setInitialSettings}
                      settings={this.state.settings}
                      changeSettings={this.changeSettings}
                    />
                  </div>
                )}
              />

              <Route path={["/cookies"]} exact render={() => <Cookies />} />

              <Route
                path={[
                  "/:character",
                  "/:character/:move",
                  "/:character/:move/:frame",
                ]}
                exact
                render={() => (
                  <div id="main">
                    <Main
                      characterListData={this.state.characterData}
                      settings={this.state.settings}
                      changeSettings={this.changeSettings}
                      updateHitboxData={this.updateHitboxData}
                      urlNotification={this.urlNotification}
                    />
                  </div>
                )}
              />

              <Route
                path="*"
                exact
                render={() => <h2> This page is not available! </h2>}
              />
            </Switch>
            {this.state.cookieMessage ? (
              <CookiePopup
                settings={this.state.settings}
                changeSettings={this.changeSettings}
              />
            ) : null}
          </Router>
        </div>
      );
    }
  }
}

export default App;
