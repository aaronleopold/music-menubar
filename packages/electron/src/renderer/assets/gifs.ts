import waneela from "./gifs/waneela.gif";
import animecup from "./gifs/animecup.gif";
import rainyfuture from "./gifs/rainyfuture.gif";
import japanpixels from "./gifs/japanpixels.gif";
import townatnight from "./gifs/townatnight.gif";
import lifeinjapan from "./gifs/lifeinjapan.gif";
import waiting from "./gifs/waiting.gif";
import stay from "./gifs/stay.gif";
import dreamhome from "./gifs/dreamhome.gif";
import streetsofrage from "./gifs/streetsofrage.gif";

export type Gif = {
  gif: any;
  source: string;
};

export const gifs: Gif[] = [
  {
    gif: waneela,
    source: "https://giphy.com/gifs/cinemagraph-RkDZq0dhhYHhxdFrJB",
  },
  {
    gif: animecup,
    source: "https://giphy.com/gifs/BMu2SwuXflOlQP8jTC",
  },
  {
    gif: rainyfuture,
    source: "https://giphy.com/gifs/3dhmyq6EKw2x7eFt4X",
  },
  {
    gif: japanpixels,
    source: "https://giphy.com/gifs/8bit-IeSXccYMz3K4U",
  },
  {
    gif: townatnight,
    source: "https://giphy.com/gifs/1yld7nW3oQ2IyRubUm",
  },
  {
    gif: lifeinjapan,
    source: "https://giphy.com/gifs/life-eyes-feast-MHboUUIoxzOKs",
  },
  {
    gif: waiting,
    source:
      "https://66.media.tumblr.com/43ff1ae84968ffd84606207e9995a78e/tumblr_py4mvbGe6h1tgo74ho1_1280.gif",
  },
  {
    gif: stay,
    source: "https://pixeljeff.tumblr.com/image/615862632485928960",
  },
  {
    gif: dreamhome,
    source: "https://pixeljeff.tumblr.com/image/616630390715760640",
  },
  {
    gif: streetsofrage,
    source: "https://giphy.com/gifs/streets-of-rage-CN9sOyaRT7YVG",
  },
];
