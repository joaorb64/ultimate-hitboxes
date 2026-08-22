//React Imports
import * as React from "react"
import { useParams, Link } from 'react-router-dom';

function InvalidPage(props) {
    return(
        <div id="characterChoiceBar">
      <Link to="/">

            <button id="chooseCharacterButton">
              <span className="material-symbols-rounded">arrow_back</span>
              Back to Character Selection
            </button>

      </Link>
        <h2> This page is not available! </h2>
      </div>
    )
    
}

export default InvalidPage