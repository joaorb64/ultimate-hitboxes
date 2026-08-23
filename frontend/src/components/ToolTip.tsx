import * as React from "react"
import ReactTooltip from "react-tooltip";

//Every trigger that uses this component is itself clickable (buttons, toggles), so this
//intentionally does NOT switch to click-triggered tooltips on touch like touchTooltipProps
//does elsewhere - react-tooltip's own click listener would swallow the trigger's click
//before the button's onClick ever runs
function ToolTip(props) {
	if (props.render) {
		return (
			<ReactTooltip id={props.id} place="top" effect="solid">
				{props.text}
    </ReactTooltip>
		)
	}
	else {
		return null;
	}
}

export default ToolTip