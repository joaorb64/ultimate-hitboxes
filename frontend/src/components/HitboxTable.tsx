//React Imports
import * as React from "react"
import ReactTooltip from "react-tooltip";

//Component Imports
import TableEntry from './TableEntry'

//Data Imports
import * as angleDescriptions from '../data/angleDescriptions.json'
import * as facingRestrictDescriptions from '../data/facingRestrictDescriptions.json'
import isTouchDevice from '../data/isTouchDevice'
import { showInfoModal } from '../data/infoModalController'

//CSS Imports
import '../css/DataTable.css';

function HitboxTable(props) {
  //Rows mount/unmount as hitboxes get filtered in and out (e.g. toggling "Always Show All
  //Hitboxes"), and react-tooltip only binds to the DOM nodes present when it last scanned -
  //rebuild after every render so newly (re)mounted trigger elements stay hooked up
  React.useEffect(() => {
    ReactTooltip.rebuild()
  })

  try {
    //Create an entry in the table for each hitbox
    let hitboxData = [];
    props.hitboxes.forEach(function (hitbox, index) {
      hitboxData.push(
        <TableEntry
          settings={props.settings}
          hitbox={hitbox}
          frames={props.move.frames}
          currentFrame={props.currentFrame}
          setCurrentFrame={props.setCurrentFrame}
          key={index}
          jumpToFrame={props.jumpToFrame}
          fields={props.fields}
          updateHitboxData={props.updateHitboxData}
        />
      )
    })

    //Create a header and a tooltip for each column in the table. On touch, headers open
    //InfoModal on tap instead of using a hover-style tooltip, with a small icon showing
    //there's more info to see
    let thList = []
    let toolTipList = []
    let className = (props.settings.dark_light === 0 ? "darkTable" : "lightTable") + " tableheader"
    props.fields.forEach(function (field, index) {
      if (isTouchDevice) {
        thList.push(
          <th key={index} className={className} onClick={() => showInfoModal(field.name, field.toolTipDescription)}>
            {field.name}
            <span className="material-symbols-rounded infoIndicator">info</span>
          </th>
        )
      }
      else {
        thList.push(<th key={index} className={className} data-tip data-for={field.toolTipID}>{field.name}</th>)
        toolTipList.push(<ReactTooltip key={index} id={field.toolTipID} place="top" effect="solid">{field.toolTipDescription}</ReactTooltip>)
      }
    })

    let tableClass = props.settings.dark_light === 0 ? "darkTable" : "lightTable";
    let headerClass = props.settings.dark_light === 0 ? "darkTable" : "lightTable";

    //Static tooltips explaining each special (>360) angle and each Facing Restrict value,
    //shared by every row showing that value (desktop only - touch opens InfoModal instead, see TableEntry)
    let specialAngleTooltips = isTouchDevice ? [] : Object.entries(angleDescriptions).map(([angle, description]) => (
      <ReactTooltip key={`specialAngle-${angle}`} id={`specialAngle-${angle}`} place="top" effect="solid">{description}</ReactTooltip>
    ))
    let facingRestrictTooltips = isTouchDevice ? [] : Object.entries(facingRestrictDescriptions).map(([value, description]) => (
      <ReactTooltip key={`facingRestrict-${value}`} id={`facingRestrict-${value}`} place="top" effect="solid">{description}</ReactTooltip>
    ))

    return (
      <div id="hitboxTable">
        <table className={tableClass}>
          <thead>
            <tr className={headerClass}>
              {thList}
            </tr>
          </thead>
          <tbody>
            {hitboxData}
          </tbody>
        </table>
        {toolTipList}
        {specialAngleTooltips}
        {facingRestrictTooltips}
      </div>
    )
  }
  catch (err) {
    return null;
  }
}

export default HitboxTable