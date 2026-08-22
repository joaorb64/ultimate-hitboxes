//React Imports
import * as React from "react"
import { BrowserRouter as Router, Link } from 'react-router-dom'

//CSS Imports
import '../css/Character.css';

//Data Imports
import * as portraitCodenames from '../data/portraitCodenames.json'
import mythraPortrait from '../media/mythra-portrait.png'

//Locally-hosted portraits for characters missing from the StreamHelperAssets repo (e.g. Mythra shares an
//in-game asset with Pyra, so her dedicated icon isn't published there)
const portraitOverrides = {
	mythra: mythraPortrait
}

function Character(props) {
	//Portraits are sourced from the StreamHelperAssets repo, keyed by each character's internal game codename.
	let codename = portraitCodenames[props.character.value]
	let renderURL = codename
		? `https://raw.githubusercontent.com/joaorb64/StreamHelperAssets/main/games/ssbu/portrait/chara_0_${codename}_00.png`
		: portraitOverrides[props.character.value]

	//Determines class the object should have
	let dark_light = props.dark_light === 0 ? "dark" : "light"
	let complete = props.character.completed ? "complete" : "incomplete"
	let characterClassName = `character character-${complete} character-${dark_light}`
	let nameClass = `name-${dark_light}`

	//Return a box for the character showing their number, artwork, and name.
	//Associated class varies based on if the character has completed data.Incomplete characters are not selectable and grayed out
	if (props.character.completed) {
		return (
			<Link to={`/${props.character.value}`}>
				<div className={characterClassName} value={props.character.value} onClick={() => console.log('Heading to /')}>
					<div className="characterArtWrapper">
						<small className="number">#{props.character.number.replace('e', 'ε')}</small>
						<small className="version">{props.character.completed ? props.character.version : "Coming Soon"}</small>
						<img className="characterArt" src={renderURL} alt={props.character.name}></img>
					</div>
					<h2 className={nameClass}>
						{props.character.name}
					</h2>
				</div>
			</Link>
		)
	}
	else {
		return (
			<div className={characterClassName} value={props.character.value} /*onClick={props.getCharacterData.bind(this, props.character.value)}*/>
				<div className="characterArtWrapper">
					<small className="number">#{props.character.number.replace('e', 'ε')}</small>
					<small className="version">{props.character.completed ? props.character.version : "Coming Soon"}</small>
					<img className="characterArt" src={renderURL} alt={props.character.name}></img>
				</div>
				<h2 className={nameClass}>{props.character.name}</h2>
			</div>
			)
	}
}

export default Character
