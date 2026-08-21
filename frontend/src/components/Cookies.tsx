//React Imports
import * as React from "react"
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Cookies(props) {

  return (
    <div id="infoText">
      <div className="infoSection">
        <h3>What Are Cookies</h3>
        <p className="info">As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>
        <p className="info">For more general information on cookies, please read <a href="https://www.privacypolicyonline.com/what-are-cookies/">"What Are Cookies"</a>. Information regarding cookies from this Cookies Policy are from <a href="https://www.generateprivacypolicy.com/">the Privacy Policy Generator</a>.</p>
      </div>

      <div className="infoSection">
        <h3>How We Use Cookies</h3>
        <p className="info">We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
      </div>

      <div className="infoSection">
        <h3>Disabling Cookies</h3>
        <p className="info">You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). You can also disable cookies on this site by rejecting the cookie notice shown upon entering the website. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. This Cookies Policy was created with the help of the <a href="https://www.cookiepolicygenerator.com/cookie-policy-generator/">Cookies Policy Generator from CookiePolicyGenerator.com</a>.</p>
      </div>

      <div className="infoSection">
        <h3>Cookie Usage</h3>
        <p className="info">This site uses cookies in order to store any site settings, such as light/dark mode, preferred character sorting, and playback options, for future visits. You will still be able to alter these settings if you reject the cookie policy, however these settings will not be saved for future visits.</p>
      </div>

      <div className="infoSection">
        <h3>More Information</h3>
        <p className="info">If there is something that you aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it interacts with a feature you use on this site. If you are still looking for more information you can reach out through <a href="https://twitter.com/joao_shino">Twitter</a>.</p>
      </div>
    </div>
    )
}

export default Cookies
