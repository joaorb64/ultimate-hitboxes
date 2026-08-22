//React Imports
import * as React from "react"

//Component Imports
import ToolTip from './ToolTip'

//CSS Imports
import '../css/Player.css';

function Player(props) {
	let toggleResolution = function () {
		let settings = JSON.parse(JSON.stringify(props.settings));
		settings.useHighResImages = !settings.useHighResImages;
		props.changeSettings(settings);
	}

	return (
		<div id="player">
			<img
				id="moveImg"
				src={props.urls[props.currentFrame-1]}
				alt="Move Frames go here"
			/>
			<span
				id="resToggle"
				className={props.settings.useHighResImages ? "active" : ""}
				data-tip
				data-for="resToggleTip"
				onClick={toggleResolution}
			>
				{props.settings.useHighResImages ? "HD" : "SD"}
			</span>
			<ToolTip id="resToggleTip" text={props.settings.useHighResImages ? "Switch to standard resolution" : "Switch to high resolution"} render={true} />
		</div>
	)

}

export default Player
