//React Imports
import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as fuzzysort from "fuzzysort"

//CSS Imports
import '../css/MoveOption.css'

function MoveDropDown(props) {
	const [query, setQuery] = useState("")
	const [open, setOpen] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(0)
	const containerRef = useRef(null)
	const inputRef = useRef(null)
	const navigate = useNavigate()

	useEffect(() => {
		function handleClickOutside(e) {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	try {
		const moves = props.currentCharacterData.moves
		const currentMove = moves.find(move => move.value === props.currentMoveData.value)

		let results = moves
		if (query.length > 0) {
			results = fuzzysort.go(query, moves, { key: "name", limit: 20 }).map(result => result.obj)
		}

		let selectMove = function (move) {
			if (move === undefined || move.complete === false) {
				return
			}
			navigate(`/${props.currentCharacterData.value}/${move.value}`)
			props.newMove(move.value)
			setQuery("")
			setOpen(false)
			setHighlightedIndex(0)
		}

		let selectableIndexes = results.reduce((acc, move, index) => {
			if (move.complete !== false) {
				acc.push(index)
			}
			return acc
		}, [])

		let moveHighlight = function (direction) {
			if (selectableIndexes.length === 0) {
				return
			}
			let pos = selectableIndexes.indexOf(highlightedIndex)
			if (pos === -1) {
				setHighlightedIndex(direction > 0 ? selectableIndexes[0] : selectableIndexes[selectableIndexes.length - 1])
				return
			}
			pos = (pos + direction + selectableIndexes.length) % selectableIndexes.length
			setHighlightedIndex(selectableIndexes[pos])
		}

		let handleKeyDown = function (e) {
			if (e.key === "ArrowDown") {
				e.preventDefault()
				setOpen(true)
				moveHighlight(1)
			}
			else if (e.key === "ArrowUp") {
				e.preventDefault()
				setOpen(true)
				moveHighlight(-1)
			}
			else if (e.key === "Enter") {
				e.preventDefault()
				selectMove(results[highlightedIndex])
			}
			else if (e.key === "Escape") {
				setOpen(false)
				inputRef.current && inputRef.current.blur()
			}
		}

		let resultsClassName = props.settings.dark_light === 0 ? "darkMoveDropDown" : "lightMoveDropDown"

		return (
			<div id="moveSearchContainer" ref={containerRef}>
				<input
					id="moveDropDown"
					ref={inputRef}
					type="text"
					placeholder={currentMove ? currentMove.name : "Select a move"}
					value={query}
					onFocus={() => setOpen(true)}
					onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlightedIndex(0) }}
					onKeyDown={handleKeyDown}
				/>
				{open ? (
					<ul id="moveSearchResults" className={resultsClassName}>
						{results.length === 0 ? <li className="moveSearchEmpty">No moves found</li> : null}
						{results.map((move, index) => (
							<li
								key={move.value}
								className={
									"moveSearchOption" +
									(move.complete === false ? " moveSearchOptionDisabled" : "") +
									(move.value === props.currentMoveData.value ? " moveSearchOptionActive" : "") +
									(index === highlightedIndex ? " moveSearchOptionHighlighted" : "")
								}
								onMouseEnter={() => setHighlightedIndex(index)}
								onClick={() => selectMove(move)}
							>
								{move.name}
							</li>
						))}
					</ul>
				) : null}
			</div>
		)
	}
	catch (e) {
		return null;
	}
}

export default MoveDropDown
