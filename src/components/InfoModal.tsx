//React Imports
import * as React from "react"
import { useState, useEffect } from "react"

//Data Imports
import { registerInfoModalListener } from '../data/infoModalController'

//CSS Imports
import '../css/InfoModal.css';

//A single, always-mounted modal that any component can open via showInfoModal(title, text)
//(see infoModalController) - used on touch devices in place of hover-style tooltips, which
//don't have a good way to show up on a phone without either getting stuck open or fighting
//the trigger's own tap
function InfoModal(props) {
	const [info, setInfo] = useState(null)

	useEffect(() => {
		registerInfoModalListener(setInfo)
	}, [])

	if (info === null) {
		return null
	}

	let style = {
		backgroundColor: props.dark_light === 0 ? "white" : "black",
		color: props.dark_light === 0 ? "black" : "white"
	}

	let close = () => setInfo(null)

	return (
		<div id="infoModalBackdrop" onClick={close}>
			<div id="infoModal" style={style} onClick={(e) => e.stopPropagation()}>
				<div id="infoModalHeader">
					<h4>{info.title}</h4>
					<span className="material-symbols-rounded" id="infoModalClose" onClick={close}>close</span>
				</div>
				<div id="infoModalBody">{info.text}</div>
			</div>
		</div>
	)
}

export default InfoModal
