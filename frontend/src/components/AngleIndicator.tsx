//React Imports
import * as React from "react"

//A small compass showing the knockback angle: a line pointing in that direction, or a dot
//in the center for "special" angles (e.g. 361, the Sakurai angle) that don't point anywhere fixed
function AngleIndicator({ angle, size = 15 }) {
	const cx = size / 2
	const cy = size / 2
	const r = size / 2 - 1.5
	const numAngle = parseFloat(angle)

	if (isNaN(numAngle)) {
		return null
	}

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="angleIndicator">
			<circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="1.2" />
			{numAngle > 360
				? <circle cx={cx} cy={cy} r="1.4" fill="currentColor" />
				: <line
						x1={cx}
						y1={cy}
						x2={cx + r * Math.cos((numAngle * Math.PI) / 180)}
						y2={cy - r * Math.sin((numAngle * Math.PI) / 180)}
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
					/>
			}
		</svg>
	)
}

export default AngleIndicator
