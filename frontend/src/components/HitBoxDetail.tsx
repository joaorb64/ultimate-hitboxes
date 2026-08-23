//React Imports
import * as React from "react"
import ReactTooltip from "react-tooltip";

//CSS Imports
import '../css/HitBoxDetail.css';

//Import Data
import * as hitboxFields from '../data/hitboxFields.json'
import isTouchDevice from '../data/isTouchDevice'
import { showInfoModal } from '../data/infoModalController'
import enumPrefixes from '../data/enumPrefixes'

function HitBoxDetail(props) {

  //Configure Colors based on dark/light mode
  let style = {
    backgroundColor: props.settings.dark_light === 0 ? "white" : "black",
    color: props.settings.dark_light === 0 ? "black" : "white"
  }

  //If there is no data to show, don't render anything
  if (props.hitboxData === undefined) {
    return(
      <div id="hitboxDetail" className="fadeOut"></div>
    );
  }

  else {
    //Parse the hitbox json data so it is held in an array of 2 element arrays. Each inner array contains the key and the value
    let dataArrays = Object.entries(props.hitboxData);
    let rows = [];
    let infoToolTips = []

    //For each array within the dataArrays array, create a row and add it to rows
    //Omit data where they key is 'frames', 'color', or 'notes', those are self inserted by myself and not part of the real game code
    dataArrays.forEach(pair => {
      if (pair[0] !== "frames" && pair[0] !== "color" && pair[0] !== "notes") {
        let value = pair[1]
        if (pair[0] === "clang_rebound") {
          value = value === "attack_setoff_kind_on" ? "true" : value === "attack_setoff_kind_off" ? "false" : value
        }
        else if (enumPrefixes[pair[0]] !== undefined && typeof value === "string" && value.startsWith(enumPrefixes[pair[0]])) {
          value = value.slice(enumPrefixes[pair[0]].length)
        }
        let isBool = value === "true" || value === "false"
        let fieldName = hitboxFields[pair[0]] ? hitboxFields[pair[0]]["name"] : pair[0]
        let fieldDescription = hitboxFields[pair[0]] ? hitboxFields[pair[0]]["toolTipDescription"] : ""
        let labelProps = isTouchDevice
          ? { onClick: () => showInfoModal(fieldName, fieldDescription) }
          : { "data-tip": true, "data-for": pair[0] }
        rows.push(
          <tr key={pair[0]}>
            <td {...labelProps}>
              {fieldName}
              {isTouchDevice ? <span className="material-symbols-rounded infoIndicator">info</span> : null}
            </td>
            <td>
              {isBool
                ? <span className={"boolValue " + (value === "true" ? "boolTrue" : "boolFalse")}>{value}</span>
                : String(value)}
            </td>
          </tr>
        )
        if (!isTouchDevice) {
          infoToolTips.push(<ReactTooltip key={pair[0]} id={pair[0]} place="top" effect="solid">{fieldDescription}</ReactTooltip>)
        }
      }
    })

    //Render the table of game data, and an exit button
    return (
      <div id="hitboxDetail" className={props.displayHitboxData ? "fadeIn" : "fadeOut"} style={style}>
        <div id="hitboxDetailHeader">
          <h4>Hitbox Details</h4>
          <span id="exit" className="material-symbols-rounded" onClick={props.setDisplayHitboxData.bind(this, false)}>close</span>
        </div>

        <div id="hitboxDetailBody">
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
        {infoToolTips}
      </div>
    )
  }
}

export default HitBoxDetail
