//React Imports
import * as React from "react"

//CSS Imports
import '../css/Info.css';

function Info(props) {

		return (
			<div id="infoText">
				<div className="infoSection">
					<h3>Original Creators</h3>
					<p className="info">
						This site is built on the work of others - thank you.
					</p>
					<ul className="info creditsList">
						<li>Site &amp; code: <a href="https://twitter.com/RSN_Bran">Brandon "RSN_Bran" Sultana</a></li>
						<li>Hitbox images: <a href="https://twitter.com/Zeckemyro">Zeckemyro</a></li>
						<li>Hitbox data: <a href="https://twitter.com/Ruben_dal">Ruben</a></li>
						<li>Fact-checking &amp; notes: <a href="https://ultimateframedata.com/">Ultimate Frame Data</a></li>
						<li>Concept inspired by <a href="https://struz.github.io/smash-move-viewer/#/v1">Smash 4 Move Viewer</a> by <a href="https://twitter.com/StruzSmash">Strutz</a></li>
					</ul>
				</div>

				<div className="infoSection">
					<h3>This Version</h3>
					<p className="info">
						Revived and redesigned by <a href="https://twitter.com/joao_shino">João "joao_shino" Ribeiro Bezerra</a>.
					</p>
				</div>
			</div>


		)

}

export default Info
