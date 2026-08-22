//React Imports
import * as React from "react"
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'

//Component Imports
import ToolTip from './ToolTip';
import SpeedOptions from './SpeedOptions';

//CSS Imports
import '../css/Button.css';

//Render 5 buttons for manipulating the video. Each button has a corresponding tool tip
//Previous: Go the the previous move in the move list, not selectable if the video is currently playing or if there is no available previous move
//Decrement: Move the video back by one frame, not selectable if the move if the video is currently playing or the move is on frame 1
//Play/Pause: If the video is playing, shows a pause button to pause the video. If the video is puased, shows a play button to play the
//Increment: Move the video forward by one frame, not selectable if the move if the video is currently playing or the move is on its last frame
//Next: Go the the next move in the move list, not selectable if the video is currently playing or if there is no available next move
function Buttons(props) {

	try {

		//Establish the total number of frames the move has
		let totalFrames = props.currentMoveData.frames

		//Establish the index of the move within the move list
		let index = -1;
		index = props.currentCharacterData.moves.findIndex(move => move.value === props.currentMoveData.value)

		//Set the move to be passed as the next move in the list
		let nextMove = undefined;
		let upIncrement = 1;

		//Set the move to be passed as the previous move in the list
		let prevMove = undefined
		let downIncrement = 1;

		//Look for the next available move (some moves are currently not selectable, skip over those)
		while (nextMove === undefined && index + upIncrement < props.currentCharacterData.moves.length) {
			if (props.currentCharacterData.moves[index + upIncrement].complete !== false) {
				nextMove = props.currentCharacterData.moves[index + upIncrement]
			}
			else {
				upIncrement = upIncrement + 1
			}
		}

		//Look for the previous available move (some moves are currently not selectable, skip over those)
		while (prevMove === undefined && index - downIncrement >= 0) {
			if (props.currentCharacterData.moves[index - downIncrement].complete !== false) {
				prevMove = props.currentCharacterData.moves[index - downIncrement]
			}
			else {
				downIncrement = downIncrement + 1
			}
		}

		return (
			<div id="buttons">

				<Link to={prevMove !== undefined ? `/${props.currentCharacterData.value}/${prevMove.value}` : null}>
					<span
						data-tip data-for="previousToolTip"
						className={"material-symbols-rounded " + (index !== 0 ? "button" : "buttonNoClick")}
						id="previous"
						onClick={() => { props.newMove(prevMove.value) }}
					>skip_previous</span>
				</Link>
				<ToolTip
					id="previousToolTip"
					text="Show Previous Move"
					render={index !== 0}
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

				<Link to={nextMove !== undefined ? `/${props.currentCharacterData.value}/${nextMove.value}` : null}>
					<span
						data-tip data-for="nextToolTip"
						className={"material-symbols-rounded " + (index !== props.currentCharacterData.moves.length - 1 ? "button" : "buttonNoClick")}
						id="next"
						onClick={() => { props.newMove(nextMove.value) }}
					>skip_next</span>
				</Link>
				<ToolTip
					id="nextToolTip"
					text="Show Next Move"
					render={index !== props.totalMoves - 1}
				/>

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

				<SpeedOptions
					setPlaySpeed={props.setPlaySpeed}
					playSpeed={props.playSpeed}
					totalFrames={totalFrames}
				/>

			</div>
		)
	}
	catch (err) {
		return null

	}
}

export default Buttons
