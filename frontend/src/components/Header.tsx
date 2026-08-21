//React Imports
import * as React from "react"
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

//Import CSS
import '../css/Header.css';

//Import Media
import twitter from '../media/twitter.png'

import github_dark from '../media/darkmode/github.png'
import github_light from '../media/lightmode/github.png'
const github = [github_dark, github_light]

function Header(props) {
  let history = useHistory();

  return (

    //Main Header Object contains three portions from left to right
    //help - Contains Info and Settings Buttons
    //title - Contains site name
    //links - Contains links to github and twitter pages
    <div id="header">
      <div id="help">
        <Link to="/info">
          <span id="infoButton" className="material-symbols-rounded helpButtons">info</span>
        </Link>

        <Link to="/settings">
          <span id="settingsButton" className="material-symbols-rounded helpButtons">settings</span>
        </Link>

        <span id="backButton" className="material-symbols-rounded helpButtons" onClick={() => {history.goBack()}}>arrow_back</span>

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
          <img id="github" className="linkButtons" src={github[props.dark_light]}/>
        </a>
      </div>
    </div>

  )

}

export default Header
