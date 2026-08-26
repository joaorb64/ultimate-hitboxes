//React Imports
import * as React from "react"
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

//Component Imports
import Player from './Player'
import Slider from './Slider'
import Buttons from './Buttons'
import DataTable from './DataTable';
import HitboxDetail from './HitBoxDetail'
import { assetBase } from '../data/assetBase'


//CSS Imports
import '../css/Player.css';
import '../css/DataPortal.css';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function DataPortal(props) {

  const [playSpeed, setPlaySpeed] = useState(props.settings.defaultPlaySpeed)

  //Persist the last-used playback speed so it's selected by default next time
  let changePlaySpeed = function (newSpeed) {
    setPlaySpeed(newSpeed)
    let settings = JSON.parse(JSON.stringify(props.settings));
    settings.defaultPlaySpeed = newSpeed;
    props.changeSettings(settings);
  }

  const [displayHitboxData, setDisplayHitboxData] = useState(false)
  const [hitboxData, setHitboxData] = useState(undefined)

  let updateHitboxData = function(data) {
    setDisplayHitboxData(true)
    setHitboxData(data)
  }

  //Keyboard shortcuts for desktop: space to play/pause, left/right arrows to step frames -
  //mirrors the same enabled/disabled rules as the on-screen buttons
  useEffect(() => {
    function handleKeyDown(e) {
      //Don't hijack typing in the move search box or anywhere else text is entered
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (e.code === "Space") {
        if (props.currentMoveData.frames !== 1) {
          e.preventDefault();
          props.setPlaying(!props.playing);
        }
      }
      else if (e.code === "ArrowLeft") {
        if (props.currentFrame !== 1 && !props.playing) {
          e.preventDefault();
          props.setCurrentFrame(props.currentFrame - 1);
        }
      }
      else if (e.code === "ArrowRight") {
        if (props.currentFrame !== props.currentMoveData.frames && !props.playing) {
          e.preventDefault();
          props.setCurrentFrame(props.currentFrame + 1);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props.currentFrame, props.playing, props.currentMoveData.frames]);

  useInterval(() => {
    if (props.settings.loopMove || props.currentFrame < props.currentMoveData.frames) {
      props.setCurrentFrame(props.currentFrame >= props.currentMoveData.frames ? 1 : props.currentFrame + 1)
    }
    //If Loop Move is disabled and we have reached the final frame, go back to frame 1 and stop playing the video
    else {
      props.setCurrentFrame(1)
      props.setPlaying(false)
    }
  }, props.playing ? ((1000 / 60) * playSpeed) : null)

  if (props.currentFrame > props.currentMoveData.frames) {
    return (
      <div>
        <h2> This page is not available! </h2>
      </div>
      );
  }

    return (

      <div>
        <div id="portalGrid">
          <div id="animationColumn">
            <Player
              url={`${assetBase}/frames/${props.currentCharacterData.number}_${props.currentCharacterData.value}/${props.currentMoveData.value}/`}
              currentFrame={props.currentFrame}
              settings={props.settings}
              changeSettings={props.changeSettings}
              character={props.currentCharacterData.value}
              move={props.currentMoveData.value}
              loadingPercent={props.loadingPercent}
              urlNotification={props.urlNotification}
              urls={props.urls}
              playing={props.playing}
            />

            <Slider
              totalFrames={props.currentMoveData.frames}
              currentFrame={props.currentFrame}
              jumpToFrame={props.jumpToFrame}
            />

            <Buttons
              currentFrame={props.currentFrame}
              setCurrentFrame={props.setCurrentFrame}
              playing={props.playing}
              setPlaying={props.setPlaying}
              currentMoveData={props.currentMoveData}
              settings={props.settings}
              changeSettings={props.changeSettings}
              playSpeed={playSpeed}
              setPlaySpeed={changePlaySpeed}
            />
          </div>

          <div id="dataColumn">
            <div id="dataTableContainer">
              {props.currentMoveData.hitboxes !== undefined && props.currentMoveData.hitboxes.length > 0 ? <DataTable
                type="hitboxes"
                settings={props.settings}
                changeSettings={props.changeSettings}
                move={props.currentMoveData}
                loading={props.loading}
                currentFrame={props.currentFrame}
                setCurrentFrame={props.setCurrentFrame}
                jumpToFrame={props.jumpToFrame}
                updateHitboxData={updateHitboxData}
              /> : null}

              {props.currentMoveData.grabs !== undefined ? <DataTable
                type="grabs"
                settings={props.settings}
                changeSettings={props.changeSettings}
                move={props.currentMoveData}
                jumpToFrame={props.jumpToFrame}
                loading={props.loading}
                currentFrame={props.currentFrame}
                updateHitboxData={updateHitboxData}
              /> : null}

              {props.currentMoveData.throws !== undefined ? <DataTable
                type="throws"
                settings={props.settings}
                changeSettings={props.changeSettings}
                move={props.currentMoveData}
                jumpToFrame={props.jumpToFrame}
                loading={props.loading}
                currentFrame={props.currentFrame}
                updateHitboxData={updateHitboxData}
              /> : null}

              {props.currentMoveData.hurtboxes !== undefined ? <DataTable
                type="hurtboxes"
                settings={props.settings}
                changeSettings={props.changeSettings}
                move={props.currentMoveData}
                jumpToFrame={props.jumpToFrame}
                loading={props.loading}
                currentFrame={props.currentFrame}
                updateHitboxData={updateHitboxData}
              /> : null}
            </div>
          </div>
        </div>

        <HitboxDetail
          updateHitboxData={setHitboxData}
          hitboxData={hitboxData}
          displayHitboxData={displayHitboxData}
          setDisplayHitboxData={setDisplayHitboxData}
          settings={props.settings}
        />

      </div>
    )


}

export default DataPortal