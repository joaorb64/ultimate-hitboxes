//React Imports
import * as React from "react"

//Component Imports
import ToolTip from './ToolTip'

//CSS Imports
import '../css/Player.css';

const shareOrigin =
	window.location.origin +
	(window.location.hostname.endsWith("github.io")
		? `/${window.location.pathname.split("/").filter(Boolean)[0] || ""}`
		: "");

function Player(props) {
	let toggleResolution = function () {
		let settings = JSON.parse(JSON.stringify(props.settings));
		settings.useHighResImages = !settings.useHighResImages;
		props.changeSettings(settings);
	}

	let copyToClipboard = function () {
		const el = document.createElement("textarea");
		el.value = props.playing
			? `${shareOrigin}/${props.character}/${props.move}`
			: `${shareOrigin}/${props.character}/${props.move}/${props.currentFrame}`;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		props.urlNotification();
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

			<span
				id="share"
				className="material-symbols-rounded"
				data-tip
				data-for="shareToolTip"
				onClick={copyToClipboard}
			>
				share
			</span>
			<ToolTip id="shareToolTip" text="Copy the link to this move" render={true} />
		</div>
	)

}

export default Player
