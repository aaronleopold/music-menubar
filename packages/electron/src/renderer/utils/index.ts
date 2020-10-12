import { gifs } from "../assets/gifs";
import { parse, ParsedUrlQuery } from "querystring";

// TODO: change to take in current bg, get random DIFFERENT bg

/**
 * Retrieve random gif from gif list
 * @returns {Object} gif - {gif: any; source: string;}
 */
export function getRandomGif(): { gif: any; source: string } {
  return gifs[Math.floor(Math.random() * gifs.length)];
}

// Issue: https://github.com/aaronleopold/music-menubar/issues/6
// Example:
// url = https://www.youtube.com/watch?v=rCFmLjGq3Jg&list=RDrCFmLjGq3Jg&start_radio=1&t=20
// params = { v: rCFmLjGq3Jg, list: RDrCFmLjGq3Jg, start_radio: 1, t=20 }

/**
 * Retrieve query params from given URL
 * @returns {ParsedUrlQuery or null} params - {key: value, ..., keyN: valueN}
 */
export function parseUrl(url: string): ParsedUrlQuery | null {
  //No string provided
  if (url === "" || url === undefined) return null;

  //No query string detected
  if (!url.includes("?")) return null;

  const queryString = url.split("?")[1];
  const params = parse(queryString);

  return params;
}
