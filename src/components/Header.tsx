//React Imports
import * as React from "react"
import { useNavigate, Link } from 'react-router-dom'

//Import CSS
import '../css/Header.css';

//Component Imports
import ToolTip from './ToolTip'

//Import Media
import twitter from '../media/twitter.png'

import github_dark from '../media/darkmode/github.png'
import github_light from '../media/lightmode/github.png'
const github = [github_dark, github_light]

function Header(props) {
  let navigate = useNavigate();

  let toggleDarkMode = function () {
    let settings = JSON.parse(JSON.stringify(props.settings));
    settings.dark_light = Math.abs(settings.dark_light - 1);
    props.changeSettings(settings);
  };

  return (

    //Main Header Object contains three portions from left to right
    //help - Contains Info, Dark/Light Mode Toggle, and Back Buttons
    //title - Contains site name
    //links - Contains links to github and twitter pages
    <div id="header">
      <div id="help">
        <Link to="/info">
          <span id="infoButton" className="material-symbols-rounded helpButtons">info</span>
        </Link>

        <span
          id="darkModeButton"
          className="material-symbols-rounded helpButtons"
          data-tooltip-id="darkModeToolTip"
          onClick={toggleDarkMode}
        >
          {props.settings.dark_light === 0 ? "light_mode" : "dark_mode"}
        </span>
        <ToolTip id="darkModeToolTip" text={props.settings.dark_light === 0 ? "Switch to light mode" : "Switch to dark mode"} render={true} />

        <span id="backButton" className="material-symbols-rounded helpButtons" onClick={() => {navigate(-1)}}>arrow_back</span>

      </div>

      <div id="title">
        <Link to="/">
          <h3>Smash Ultimate Hitbox Viewer</h3>
        </Link>
      </div>

      <div id="links">
        <a href="https://twitter.com/joao_shino">
          <img id="twitter" className="linkButtons" src={twitter}/>
        </a>
        <a href="https://github.com/joaorb64/ultimate-hitboxes">
          <img id="github" className="linkButtons" src={github[props.settings.dark_light]}/>
        </a>
      </div>
    </div>

  )

}

export default Header
