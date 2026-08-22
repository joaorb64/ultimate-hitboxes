//React Imports
import * as React from "react"

//CSS Imports
import '../css/Player.css';

function Player(props) {
	return (
		<div id="player">
			<img
				id="moveImg"
				src={props.urls[props.currentFrame-1]}
				alt="Move Frames go here"
			/>
		</div>
	)

}

export default Player
