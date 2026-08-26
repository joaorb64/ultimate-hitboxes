import * as React from "react"

import '../css/Slider.css';

function Slider(props) {

	if (props.totalFrames == 1) {
		return null;
	}

	let ticks = []
	for (let i = 1; i <= props.totalFrames; i++) {
		ticks.push(<span key={i} className="sliderTick" />)
	}

	try {
		return (
			<div id="sliderContainer">
				<h5>Frame: {props.currentFrame}/{props.totalFrames}</h5>
				<div id="sliderTrackWrapper">
					<input
						id="videoSlider"
						name="videoSlider"
						type="range"
						min="1"
						max={props.totalFrames}
						value={props.currentFrame}
						onChange={e => props.jumpToFrame(parseInt(e.target.value))}
					/>
					<div id="sliderTicks">
						{ticks}
					</div>
				</div>
			</div>
		)
	}
	catch {
		return null
	}

}

export default Slider
