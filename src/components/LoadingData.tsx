//React Imports
import * as React from "react";

import { useState, useEffect, useRef } from "react";
import { assetBase } from "../data/assetBase";

const frameURL = (props, frame) => {
  const path = props.url.replace(/\+/g, "/");
  if (props.settings.useHighResImages) {
    return `https://raw.githubusercontent.com/joaorb64/ultimate-hitboxes/assets/${path}/${frame}.png`;
  }
  return `${assetBase}/${path}/${frame}.webp`;
};

function LoadingData(props) {
  //Empty array of images
  let images = [];

  //Local counter for how many images have successfully loaded so far
  let loadedSoFar = 0;

  let compareTime = new Date();

  //Local Storage value for this move is empty, perform the get request
  let urls = [];
  for (var i = 1; i <= props.currentMoveData.frames; i++) {
    let image = new Image();
    image.src = frameURL(props, i);
    images.push(image);
    urls.push(image.src);
  }
  props.setUrls(urls);

  //Create the timer upon a component load
  useEffect(() => {
    const interval = setInterval(() => {
      //Calculate number of images complete so far, update the local counter and the counter in the parent component used for re-rendering the loading bar
      props.setLoadedSoFar(images.filter((image) => image.complete).length);
      loadedSoFar = images.filter((image) => image.complete).length;

      //If all images are loaded, complete loading process and clear the interval
      if (loadedSoFar === props.currentMoveData.frames) {
        props.setLoading(false);
        clearInterval(interval);
      }
    }, 10);
  }, []);

  return null;
}

export default React.memo(LoadingData);
