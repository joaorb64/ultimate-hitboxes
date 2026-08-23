import * as React from "react"

import ToolTip from './ToolTip'

import '../css/SpeedOptions.css';

//Maps the raw frame-multiplier values used by the <select> to the label shown on the badge
const speedLabels = {
	"60": "1fps",
	"10": "0.1x",
	"4": "0.25x",
	"2": "0.5x",
	"1": "1x",
	"0.5": "2x",
}

function SpeedOptions(props) {
	if (props.totalFrames === 1) {
		return null;
	}
	else {
		return (
			<div id="speedOptions">
				<div id="speedCombo" data-tip data-for="speedIconToolTip">
					<span className="material-symbols-rounded" id="speedIcon" aria-hidden="true">speed</span>
					<span id="speedBadge">{speedLabels[props.playSpeed] || `${props.playSpeed}x`}</span>
					<select
						id="playSpeedSelect"
						aria-label="Playback Speed"
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
				<ToolTip id="speedIconToolTip" text="Playback Speed" render={true} />
			</div>
		)
	}

}

export default SpeedOptions
