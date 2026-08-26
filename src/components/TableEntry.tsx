//React Imports
import * as React from "react"

//Component Imports
import AngleIndicator from './AngleIndicator'

//Data Imports
import isTouchDevice from '../data/isTouchDevice'
import { showInfoModal } from '../data/infoModalController'
import angleDescriptions from '../data/angleDescriptions.json'
import facingRestrictDescriptions from '../data/facingRestrictDescriptions.json'
import enumPrefixes from '../data/enumPrefixes'

//CSS Imports
import '../css/DataTable.css'

//import id_colors from '../id_colors.js'

function condenseFrames(arr) {
  let start, end;  // track start and end
  end = start = arr[0];
  let i;
  let result = ""
  for (i = 1; i < arr.length; i++)
  {
    // as long as entries are consecutive, move end forward
    if (arr[i] == (arr[i - 1] + 1)) {
      end = arr[i];
    }
    else {
      // when no longer consecutive, add group to result
      // depending on whether start=end (single item) or not
      if (start == end)
        result += start + ",";
      else if (end == (start + 1))
        result += start + "-" + end + ",";
      else
        result += start + "-" + end + ",";

      start = end = arr[i];
    }
  }

  // handle the final group
  if (start == end)
    result += start;
  else
    result += start + "-" + end;
  return result;
}

function boolCell(key, className, value) {
  let isTrue = value === "true"
  return (
    <td key={key} className={className}>
      <span className={"boolValue " + (isTrue ? "boolTrue" : "boolFalse")}>{value}</span>
    </td>
  )
}

function TableEntry(props) {

  let style = {backgroundColor:null}

  //Use dark or light version of the table depending on settings
  let className = props.settings.dark_light === 0 ? "darkTable" : "lightTable"

  //Certain color codes need their text color to change to fit the background
  let lightModeColorChange = ["#800080", "#400040", "purple", "#2F152E", "2F152E", "darkblue"]
  let darkModeColorChange = ["pink", "aqua", "khaki", "lightgreen"]

  if (props.hitbox.frames.includes(props.currentFrame) || props.hitbox.frames.length === 0) {
    style.backgroundColor = props.hitbox.color
    if (props.settings.dark_light === 0 && darkModeColorChange.includes(props.hitbox.color)) {
      className = "darkTableDarkText"
    }
    if (props.settings.dark_light === 1 && lightModeColorChange.includes(props.hitbox.color)) {
      className = "lightTableLightText"
    }
  }

  let tdList = [];

  //For each column, fill in data
  props.fields.forEach(function (field, index) {

    //If adding the frames variable, only show the first frame in the table and pass in a function to change to that frame on click
    if (field.variable === "frames") {
      if (props.hitbox.frames.length === 0) {
        tdList.push(<td key={index} className={className}>-</td>)
      }
      else {
        tdList.push(<td
          key={index}
          className={className}
          style={props.hitbox.frames.length !== 0 ? { "cursor": "pointer" } : {}}
          onClick={() => { props.jumpToFrame(props.hitbox.frames[0]) }}
        >
          {condenseFrames(props.hitbox[field.variable])}
        </td>)
      }
    }

    //If adding the damage variable, multiply the value by 1.2 if the damageMultiplier setting is enabled
    else if (field.variable === "damage" && props.settings.damageMultiplier) {
      tdList.push(<td key={index} className={className}>{(props.hitbox[field.variable] * 1.2).toFixed(1)}</td>)
    }

    //Parse Ground/Air value into something more readable
    else if (field.variable === "ground_or_air") {
      let ground_air = { "collision_situation_mask_g": "Ground", "collision_situation_mask_g_d": "Ground", "collision_situation_mask_a": "Aerial", "collision_situation_mask_ga": "Both"};

      tdList.push(<td key={index} className={className}>{ground_air[props.hitbox[field.variable]] === undefined ? "-" : ground_air[props.hitbox[field.variable]]}</td>)
    }

    //Add Degree symbol after the angle, plus a small compass showing the direction
    else if (field.variable === "angle") {
      let numAngle = parseFloat(props.hitbox[field.variable])
      let isSpecial = numAngle > 360
      let touchProps = (isSpecial && isTouchDevice) ? {
        onClick: () => showInfoModal(`${props.hitbox[field.variable]}° Angle`, angleDescriptions[numAngle])
      } : {
        "data-tooltip-id": isSpecial ? `specialAngle-${numAngle}` : undefined,
      }
      tdList.push(
        <td key={index} className={className}>
          <span
            className={"infoValueCell" + (isSpecial ? " specialAngle" : "")}
            {...touchProps}
          >
            {props.hitbox[field.variable]}&deg;
            <span className="angleCompassWrapper">
              <AngleIndicator angle={props.hitbox[field.variable]} />
            </span>
            {(isSpecial && isTouchDevice) ? <span className="material-symbols-rounded infoIndicatorInline">info</span> : null}
          </span>
        </td>
      )
    }

    //Facing Restrict values each mean something different (see facingRestrictDescriptions) -
    //show that explanation the same way special angles do
    else if (field.variable === "facingrestrict") {
      let raw = props.hitbox[field.variable]
      let prefix = enumPrefixes.facingrestrict
      let value = typeof raw === "string" && raw.startsWith(prefix) ? raw.slice(prefix.length) : raw
      let description = facingRestrictDescriptions[value]
      let touchProps = (description && isTouchDevice) ? {
        onClick: () => showInfoModal(`Facing Restrict: ${value}`, description)
      } : {
        "data-tooltip-id": description ? `facingRestrict-${value}` : undefined,
      }
      tdList.push(
        <td key={index} className={className}>
          <span className="infoValueCell" {...touchProps}>
            {value === undefined || value === "" ? "-" : value}
            {(description && isTouchDevice) ? <span className="material-symbols-rounded infoIndicatorInline">info</span> : null}
          </span>
        </td>
      )
    }

    //Several enum-valued fields carry a common prefix that's just noise here - strip it if present
    else if (enumPrefixes[field.variable] !== undefined) {
      let raw = props.hitbox[field.variable]
      let prefix = enumPrefixes[field.variable]
      let value = typeof raw === "string" && raw.startsWith(prefix) ? raw.slice(prefix.length) : raw
      tdList.push(<td key={index} className={className}>{value === undefined || value === "" ? "-" : value}</td>)
    }

    //Clang/rebound is stored as an attack_setoff_kind_on/off enum - normalize it to true/false
    else if (field.variable === "clang_rebound") {
      let raw = props.hitbox[field.variable]
      let value = raw === "attack_setoff_kind_on" ? "true" : raw === "attack_setoff_kind_off" ? "false" : raw
      tdList.push(boolCell(index, className, value))
    }

    //Render true/false values as a checkbox that still copies as the word true/false
    else if (props.hitbox[field.variable] === "true" || props.hitbox[field.variable] === "false") {
      tdList.push(boolCell(index, className, props.hitbox[field.variable]))
    }

    //If showing more data, create a button to click in the table
    else if (field.variable === "more") {
      tdList.push(<td key={index} className={className} onClick={props.updateHitboxData.bind(this, props.hitbox)} style={{ cursor: "pointer", width: "5px" }}><span
        className="material-symbols-rounded"
        style={{ fontSize: "16px" }}
      >info</span></td >)
    }

    //For any other value, display the value without alteration, unless the value doesn't exist, for which display a '-'
    else {
      tdList.push(<td key={index} className={className}>{props.hitbox[field.variable] === undefined || props.hitbox[field.variable] === "" ? "-" : props.hitbox[field.variable]}</td>)
    }
  })

  //If the current hitbox isn't active on the current frame and the showAllHitboxData setting is disabled and the hitbox has at least one frame, do not render the row
  if (!props.hitbox.frames.includes(props.currentFrame) && !props.settings.showAllHitboxData && props.hitbox.frames.length !== 0) {
    return null;
  }
  //Otherwise render the row with the styling from above
  else {
    return (
      <tr style={style}>
        {tdList}
      </tr>
    )
  }
  
}

export default TableEntry