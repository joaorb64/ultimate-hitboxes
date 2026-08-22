import * as React from "react"
import ReactTooltip from "react-tooltip";
import touchTooltipProps from "../data/touchTooltipProps";

function ToolTip(props) {
	if (props.render) {
		return (
			<ReactTooltip id={props.id} place="top" effect="solid" {...touchTooltipProps}>
				{props.text}
    </ReactTooltip>
		)
	}
	else {
		return null;
	}
}

export default ToolTip