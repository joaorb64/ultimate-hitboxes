//React Imports
import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

//Component Imports
import DataPortal from "./DataPortal";
import Loading from "./Loading";
import InvalidPage from "./InvalidPage";
import MoveDropDown from "./MoveDropDown";
import ToolTip from "./ToolTip";
import { getCharacterData, getMoveData } from "../data/staticData";

//CSS Imports
import "../css/Player.css";

function Main(props) {
  const [character, setCharacter] = useState(
    useParams().character.toLowerCase(),
  );
  const [move, setMove] = useState(useParams().move);
  const [currentFrame, setCurrentFrame] = useState(
    useParams().frame === undefined ? 1 : parseInt(useParams().frame),
  );
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);

  let characterIndex = 0;
  let characterKey;

  let jumpToFrame = function (frame) {
    setPlaying(false);
    setCurrentFrame(frame);
  };

  let newMove = function (move) {
    setPlaying(false);
    setMove(move);
    setCurrentFrame(1);
  };

  //Determine which character is the current character, save the data and the index
  while (characterIndex < props.characterListData.length) {
    if (props.characterListData[characterIndex].value === character) {
      characterKey = props.characterListData[characterIndex];
      break;
    }
    characterIndex += 1;
  }

  //Return nothing if the character doesn't exist
  if (
    props.characterListData.filter(
      (element) => element.value.toLowerCase() === character.toLowerCase(),
    ).length === 0 ||
    props.characterListData[characterIndex].completed === false
  ) {
    return <InvalidPage settings={props.settings} />;
  }

  //Set up State variables
  const [currentCharacterData, setCurrentCharacterData] = useState({});
  const [currentMoveData, setCurrentMoveData] = useState({});

  useEffect(() => {
    let promise = new Promise<void>(function (resolve, reject) {
      resolve();
    });

    promise.then(() => {
      if (
        sessionStorage.getItem(
          `/${characterKey.number}_${characterKey.value}/data`,
        ) !== null &&
        process.env.NODE_ENV === "production"
      ) {
        let data = JSON.parse(
          sessionStorage.getItem(
            `/${characterKey.number}_${characterKey.value}/data`,
          ),
        );
        setCurrentCharacterData(data);
        if (move === undefined) {
          setMove(data.moves[0].value);
        }
      } else {
        const data = getCharacterData(
          `${characterKey.number}_${characterKey.value}`,
        );
        sessionStorage.setItem(
          `/${characterKey.number}_${characterKey.value}/data`,
          JSON.stringify(data),
        );
        setCurrentCharacterData(data);
        if (move === undefined) {
          setMove(data.moves[0].value);
        }
      }
    });
  }, [character]);

  useEffect(() => {
    setPlaying(false);

    try {
      if (
        sessionStorage.getItem(
          `/${characterKey.number}_${characterKey.value}/${move}/data`,
        ) !== null &&
        process.env.NODE_ENV === "production"
      ) {
        let promise = new Promise<void>(function (resolve, reject) {
          resolve();
        });

        promise.then(() => {
          let data = JSON.parse(
            sessionStorage.getItem(
              `/${characterKey.number}_${characterKey.value}/${move}/data`,
            ),
          );
          setCurrentMoveData(data);
          setLoading(true);
        });
      } else {
        const data = getMoveData(
          `${characterKey.number}_${characterKey.value}`,
          move,
        );
        sessionStorage.setItem(
          `/${characterKey.number}_${characterKey.value}/${move}/data`,
          JSON.stringify(data),
        );
        setCurrentMoveData(data);
        setLoading(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [move]);

  //Re-fetch the move's animation frames at the new resolution when the SD/HD setting is toggled
  useEffect(() => {
    setLoading(true);
  }, [props.settings.useHighResImages]);

  //If move data doesn't exist or doesn't match the URL, query database to get move data
  try {
    if (
      currentCharacterData.moves.filter(
        (element) => element.value.toLowerCase() === move.toLowerCase(),
      ).length === 0
    ) {
      return <InvalidPage settings={props.settings} />;
    }
  } catch {}

  if (loading && currentMoveData.value !== undefined) {
    return (
      <Loading
        url={`frames+${props.characterListData[characterIndex].number}_${character.toLowerCase()}+${currentMoveData.value}`}
        loading={loading}
        setLoading={setLoading}
        currentMoveData={currentMoveData}
        setUrls={setUrls}
        settings={props.settings}
      />
    );
  } else if (!loading && currentMoveData.value !== undefined) {
    //Establish the index of the move within the move list, and the previous/next
    //selectable moves (some moves aren't selectable yet, skip over those)
    let moveIndex = currentCharacterData.moves.findIndex(
      (moveOption) => moveOption.value === currentMoveData.value,
    );

    let prevMove = undefined;
    let downIncrement = 1;
    while (prevMove === undefined && moveIndex - downIncrement >= 0) {
      if (currentCharacterData.moves[moveIndex - downIncrement].complete !== false) {
        prevMove = currentCharacterData.moves[moveIndex - downIncrement];
      } else {
        downIncrement += 1;
      }
    }

    let nextMove = undefined;
    let upIncrement = 1;
    while (nextMove === undefined && moveIndex + upIncrement < currentCharacterData.moves.length) {
      if (currentCharacterData.moves[moveIndex + upIncrement].complete !== false) {
        nextMove = currentCharacterData.moves[moveIndex + upIncrement];
      } else {
        upIncrement += 1;
      }
    }

    return (
      <div>
        <div id="characterChoiceBar">
          <h2 id="currentCharacterName">{currentCharacterData.name}</h2>
          <div id="moveSelectionRow">
            <Link id="previousMoveLink" to={prevMove !== undefined ? `/${currentCharacterData.value}/${prevMove.value}` : null}>
              <span
                data-tip data-for="previousMoveToolTip"
                className={"material-symbols-rounded " + (prevMove !== undefined ? "moveNavButton" : "moveNavButtonNoClick")}
                id="previousMove"
                onClick={() => { prevMove !== undefined && newMove(prevMove.value) }}
              >skip_previous</span>
            </Link>
            <ToolTip id="previousMoveToolTip" text="Show Previous Move" render={prevMove !== undefined} />

            <MoveDropDown
              currentCharacterData={currentCharacterData}
              currentMoveData={currentMoveData}
              settings={props.settings}
              newMove={newMove}
            />

            <Link id="nextMoveLink" to={nextMove !== undefined ? `/${currentCharacterData.value}/${nextMove.value}` : null}>
              <span
                data-tip data-for="nextMoveToolTip"
                className={"material-symbols-rounded " + (nextMove !== undefined ? "moveNavButton" : "moveNavButtonNoClick")}
                id="nextMove"
                onClick={() => { nextMove !== undefined && newMove(nextMove.value) }}
              >skip_next</span>
            </Link>
            <ToolTip id="nextMoveToolTip" text="Show Next Move" render={nextMove !== undefined} />
          </div>
        </div>
        <DataPortal
          settings={props.settings}
          changeSettings={props.changeSettings}
          characterListData={props.characterListData}
          currentCharacterData={currentCharacterData}
          currentMoveData={currentMoveData}
          setCharacter={setCharacter}
          newMove={newMove}
          currentFrame={currentFrame}
          setCurrentFrame={setCurrentFrame}
          updateHitboxData={props.updateHitboxData}
          playing={playing}
          setPlaying={setPlaying}
          jumpToFrame={jumpToFrame}
          urlNotification={props.urlNotification}
          urls={urls}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default Main;
