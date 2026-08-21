//React Imports
import * as React from "react"

//CSS Imports
import '../css/CharacterList.css';


function SortBy(props) {

	return (
		<div id="sortBy">
			<span className="sortOption">
				<input type="radio" id="number" name="sort" value="number" onChange={() => { props.settings.sortBy = "number"; props.changeSettings(props.settings) }} checked={props.settings.sortBy === "number"} />
				<label htmlFor="number">Sort by Number</label>
			</span>

			<span className="sortOption">
				<input type="radio" id="name" name="sort" value="name" onChange={() => { props.settings.sortBy = "name"; props.changeSettings(props.settings) }} checked={props.settings.sortBy === "name"} />
				<label htmlFor="name">Sort by Name</label>
			</span>
		</div>
	)
}

export default SortBy
