//React Imports
import * as React from "react"
import ReactTooltip from "react-tooltip";

//Component Imports
import TableEntry from './TableEntry'

//Data Imports
import * as angleDescriptions from '../data/angleDescriptions.json'
import touchTooltipProps from '../data/touchTooltipProps'

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

    //Create a header and a tooltip for each column in the table
    let thList = []
    let toolTipList = []
    let className = (props.settings.dark_light === 0 ? "darkTable" : "lightTable") + " tableheader"
    props.fields.forEach(function (field, index) {
      thList.push(<th key={index} className={className} data-tip data-for={field.toolTipID}>{field.name}</th>)
      toolTipList.push(<ReactTooltip key={index} id={field.toolTipID} place="top" effect="solid" {...touchTooltipProps}>{field.toolTipDescription}</ReactTooltip>)
    })

    let tableClass = props.settings.dark_light === 0 ? "darkTable" : "lightTable";
    let headerClass = props.settings.dark_light === 0 ? "darkTable" : "lightTable";

    //Static tooltips explaining each special (>360) angle, shared by every row showing that angle
    let specialAngleTooltips = Object.entries(angleDescriptions).map(([angle, description]) => (
      <ReactTooltip key={`specialAngle-${angle}`} id={`specialAngle-${angle}`} place="top" effect="solid" {...touchTooltipProps}>{description}</ReactTooltip>
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
      </div>
    )
  }
  catch (err) {
    return null;
  }
}

export default HitboxTable