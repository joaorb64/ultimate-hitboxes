//React Imports
import * as React from "react"

//Component Imports
import Character from './Character'
import SortBy from './SortBy'

//CSS Imports
import '../css/CharacterList.css';

const sortingMethods = {
	"name": "ascending",
	"number": "ascending"
}

function CharacterList(props) {

	//If chararacter data doesn't exist, query the backend server
	if (props.characterListData === undefined) {
		return null;
	}
	else {
		//Create a deep copy of the settings
		let settings = JSON.parse(JSON.stringify(props.settings));
		
		let sortedCharacterData = []

		//Sort Characters based on the criteria in the sortBy Field
		if (sortingMethods[props.settings.sortBy] === "ascending") {
			sortedCharacterData = props.characterListData.slice().sort((a, b) => (a[props.settings.sortBy] > b[props.settings.sortBy]) ? 1 : -1)
		}
		else {
			sortedCharacterData = props.characterListData.slice().sort((a, b) => (a[props.settings.sortBy] < b[props.settings.sortBy]) ? 1 : -1)
    }
		//Filter the results based on the searchBar
		sortedCharacterData = sortedCharacterData.filter(obj => { return obj.name.toUpperCase().includes(props.search.toUpperCase()) })

		//Create icons based on the constraints above
		let characterButtonArray = []
		characterButtonArray = sortedCharacterData.map(character => <Character key={character.id} dark_light={props.settings.dark_light} character={character} getCharacterData={props.getCharacterData}/>)

		return (
			<div id="characterList">
				<form id="searchControls">
					<div id="searchbarWrapper">
						<span className="material-symbols-rounded" id="searchIcon">search</span>
						<input id="searchbar" type="text" value={props.search} placeholder="Search for a Character" onChange={props.changeSearchValue} ></input>
						{props.search.length > 0 &&
							<span
								className="material-symbols-rounded"
								id="searchClear"
								onClick={() => { props.changeSearchValue({ target: { value: "" } }) }}
							>close</span>
						}
					</div>

					<SortBy changeSettings={props.changeSettings} settings={settings} />

				</form>
				{characterButtonArray}
			</div>
		)
	}
	
}


export default CharacterList