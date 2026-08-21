//React Imports
import * as React from "react"

function DefaultSpeed(props) {
	return (
		<select
			id="defaultSpeedSelect"
			className="settingCheckbox"
			value={props.settings.defaultPlaySpeed}
			onChange={(e) => { props.settings.defaultPlaySpeed = parseFloat(e.target.value); props.changeSettings(props.settings) }}
		>
			<option value="60">1fps</option>
			<option value="10">0.1x</option>
			<option value="4">0.25x</option>
			<option value="2">0.5x</option>
			<option value="1">1x</option>
			<option value="0.5">2x</option>
		</select>
	)
}

export default DefaultSpeed
