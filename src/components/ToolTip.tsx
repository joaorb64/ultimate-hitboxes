import * as React from "react"
import { Tooltip } from "react-tooltip";

const isTouch = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches

//Every trigger that uses this component is a media/nav button, not a piece of info to
//read - on touch there's no room for a hover-style tooltip anyway, so skip it entirely
//rather than fighting the trigger's own onClick for the tap
function ToolTip(props) {
	if (props.render && !isTouch) {
		return (
			<Tooltip id={props.id} place="top">
				{props.text}
    </Tooltip>
		)
	}
	else {
		return null;
	}
}

export default ToolTip