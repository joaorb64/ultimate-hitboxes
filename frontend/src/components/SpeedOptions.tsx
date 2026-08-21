import * as React from "react"

import '../css/SpeedOptions.css';

function SpeedOptions(props) {
	if (props.totalFrames === 1) {
		return null;
	}
	else {
		return (
			<div id="speedOptions">
				<label htmlFor="playSpeedSelect">Playback Speed</label>
				<select
					id="playSpeedSelect"
					value={props.playSpeed}
					onChange={(e) => { props.setPlaySpeed(parseFloat(e.target.value)) }}
				>
					<option value="60">1fps</option>
					<option value="10">0.1x</option>
					<option value="4">0.25x</option>
					<option value="2">0.5x</option>
					<option value="1">1x</option>
					<option value="0.5">2x</option>
				</select>
			</div>
		)
	}

}

export default SpeedOptions
