//React Imports
import * as React from "react"

//Component Imports
import ToolTip from './ToolTip'

//CSS Imports
import '../css/QuickSettings.css';

const toggles = [
	{ key: "showAllHitboxData", chip: "All Hitboxes", label: "Show all hitboxes at all times" },
	{ key: "damageMultiplier", chip: "1v1 Multi", label: "Apply 1v1 damage multiplier" },
	{ key: "showExtraInfo", chip: "Extra Info", label: "Show extra hitbox info" },
	{ key: "useHighResImages", chip: "HD", label: "Use high-resolution images" },
]

function QuickSettings(props) {
	let toggle = function (key) {
		let settings = JSON.parse(JSON.stringify(props.settings));
		settings[key] = !settings[key];
		props.changeSettings(settings);
	}

	return (
		<div id="quickSettingsBar">
			{toggles.map(t => (
				<React.Fragment key={t.key}>
					<span
						className={"quickSettingChip" + (props.settings[t.key] ? " active" : "")}
						data-tip
						data-for={`quickSetting-${t.key}`}
						onClick={() => toggle(t.key)}
					>
						{t.chip}
					</span>
					<ToolTip id={`quickSetting-${t.key}`} text={t.label} render={true} />
				</React.Fragment>
			))}
		</div>
	)
}

export default QuickSettings
