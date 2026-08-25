//React Imports
import * as React from "react"

//Component Imports
import ToolTip from './ToolTip';
import SpeedOptions from './SpeedOptions';

//CSS Imports
import '../css/Button.css';

//Render 3 buttons for manipulating the video. Each button has a corresponding tool tip
//Decrement: Move the video back by one frame, not selectable if the move if the video is currently playing or the move is on frame 1
//Play/Pause: If the video is playing, shows a pause button to pause the video. If the video is puased, shows a play button to play the
//Increment: Move the video forward by one frame, not selectable if the move if the video is currently playing or the move is on its last frame
function Buttons(props) {

	try {

		//Establish the total number of frames the move has
		let totalFrames = props.currentMoveData.frames

		return (
			<div id="buttons">

				<div id="transportControls">
					<span
						data-tip data-for="loopToolTip"
						className={"material-symbols-rounded button" + (props.settings.loopMove ? " buttonActive" : "")}
						id="loop"
						onClick={() => {
							let settings = JSON.parse(JSON.stringify(props.settings));
							settings.loopMove = !settings.loopMove;
							props.changeSettings(settings);
						}}
					>repeat</span>
					<ToolTip
						id="loopToolTip"
						text={props.settings.loopMove ? "Looping Enabled" : "Looping Disabled"}
						render={true}
					/>

					<span
						data-tip data-for="minusToolTip"
						className={"material-symbols-rounded " + (props.currentFrame !== 1 && !props.playing ? "button" : "buttonNoClick")}
						id="minus"
						onClick={() => { props.currentFrame !== 1 && !props.playing ? props.setCurrentFrame(props.currentFrame - 1) : null }}
					>chevron_left</span>

					<ToolTip
						id="minusToolTip"
						text="Go Back 1 Frame"
						render={props.currentFrame !== 1 && !props.playing}
					/>

					<span
						data-tip data-for="playToolTip"
						className={"material-symbols-rounded " + (totalFrames !== 1 ? "button" : "buttonNoClick")}
						id="pause-play"
						onClick={() => {props.setPlaying(!props.playing)}}
					>{props.playing ? "pause" : "play_arrow"}</span>
					<ToolTip
						id="playToolTip"
						text={props.playing ? "Pause the Move" : "Play the Move"}
						render={totalFrames !== 1}
					/>

					<span
						data-tip data-for="plusToolTip"
						className={"material-symbols-rounded " + (props.currentFrame !== totalFrames && !props.playing ? "button" : "buttonNoClick")}
						id="plus"
						onClick={() => { props.currentFrame !== totalFrames && !props.playing ? props.setCurrentFrame(props.currentFrame + 1) : null }}
					>chevron_right</span>
					<ToolTip
						id="plusToolTip"
						text="Go Forward 1 Frame"
						render={props.currentFrame !== totalFrames && !props.playing}
					/>

					<SpeedOptions
						setPlaySpeed={props.setPlaySpeed}
						playSpeed={props.playSpeed}
						totalFrames={totalFrames}
					/>
				</div>

			</div>
		)
	}
	catch (err) {
		return null

	}
}

export default Buttons
