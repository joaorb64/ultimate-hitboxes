//React Imports
import * as React from "react"
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../css/CookiePopup.css';

function CookiePopup(props) {

    //Create a deep copy of the settings
    let settings = JSON.parse(JSON.stringify(props.settings));

  return (

        <div id="cookiePopup">
            <div className="cookieDescription">
                <p>
                    This site uses cookies to enhance the user experience by saving settings for repeat visits.
                </p>
            </div>
            <div id="cookieButtons">
                <button className="cookieButton" id="rejectCookiesButton" onClick={() => { settings.cookiesEnabled = false; props.changeSettings(settings, false) }}>Reject</button>
                <button className="cookieButton" id="acceptCookiesButton" onClick={() => { settings.cookiesEnabled = true; props.changeSettings(settings, false) }}>Accept</button>
                <Link to="/cookies">
                    <button className="cookieButton" id="moreInfoButton">More Information</button>
                </Link>
            </div>
        </div>
    )
}

export default CookiePopup
