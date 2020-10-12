# music-menubar

![Supported Platforms](https://camo.githubusercontent.com/a50c47295f350646d08f2e1ccd797ceca3840e52/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706c6174666f726d2d6d61634f5325323025374325323057696e646f77732532302537432532304c696e75782d6c69676874677265792e737667)
![Top Language](https://img.shields.io/github/languages/top/aaronleopold/music-menubar)
![Issues Open](https://img.shields.io/github/issues-raw/aaronleopold/music-menubar)
![Hacktoberfest](https://img.shields.io/github/hacktoberfest/2020/aaronleopold/music-menubar)
[![Buy me a tree](https://img.shields.io/badge/Buy%20me%20a%20coffee-☕-lightgreen)](https://www.buymeacoffee.com/aaronbleop)

tldr; a dropdown media controller for your youtube playlists / videos (and planned spotify + soundcloud controller too), written using React, Tailwind CSS and Electron

<p align="center">
  <img src="./packages/electron/src/renderer/assets/readme-demo.gif">
</p>

### More deets

I'm always trying to create things to help improve my workflow, and while this app may only be a small improvement, it is more than enough for me.

A quick note, I will be using the term 'stream' throughout this readme when referring to some of the YouTube functionalities, but really any YouTube video will work. I just intended the usage to be a stream initially and so that is the verbage I adopted.

### Current state

Currently this media player is only capable of managing existing YouTube playlists and streams. I originally had a spotify controller partly working, but decided to focus on one feature at a time. So, until the YouTube portion is closer to where I want it to be I'll be shelving the spotify controls.

I noticed that electron menubar apps don't play nicely with tiling managers (like what I have on my linux machine) and so I have plans to add a TUI variant of this application sometime in the future, so that you can manage/play YouTube playlists through the terminal. YouTube is the only service I plan to add here currently, see [spotify-tui](https://github.com/Rigellute/spotify-tui) if you want an awesome terminal way of controlling Spotify. This will also be a large inspiration for the development of the YouTube TUI.

### Installation

Until a release has been made, you can follow the development startup procedure as follows:

```bash
git clone https://github.com/aaronleopold/music-menubar.git
cd music-menubar

yarn
yarn install:all
```

This will install all dependencies (for electron and tui clients). If you only want a specific client, see below.

#### Electron Menubar Application

Configure an `.env` file using the provided `.env.example` file. Once this step is finished, you can install the dependencies and run the program:

```bash
yarn
yarn install:electron
yarn dev:electron
```

#### TUI Application

Currently, this is nonexistant. However, the install and startup scripts are written and likely won't change once this is started.

```bash
yarn
yarn install:tui
yarn dev:tui
```

### Usage

Please refer to the corresponding README's for the package you wish to use

#### Electron Menubar Application

[`packages/electron/README.md`](packages/electron/README.md)

#### TUI Application

[`packages/tui/README.md`](packages/tui/README.md)

### Artwork

I used a large amount (and still increasing) of gifs in the electron application, and none of it is mine. Zip. All of the art you see is thanks to other people who have amazingly great talent, and the references to all gifs used can be found in `src/renderer/assets/gifs.ts`.You'll see an array of objects, and the source field is the source. Please take the time to check it out and give let the artist know if you happen across something you love!

For example:

```tsx
{
    gif: waneela,
    source: "https://giphy.com/gifs/cinemagraph-RkDZq0dhhYHhxdFrJB",
}
```

I will work on a more appropriate way of attributing these creators (i.e. see [`src/renderer/assets/attribution.md`](https://github.com/aaronleopold/music-menubar/blob/main/src/renderer/assets/attribution.md)), but until then please refer to the file above.

#### Contributing

I've started creating and annotating issues specifically for the start of Hacktober. Please allow issues marked as "good first issue" to be completed by those with less experience, as I intentionally set these aside. Additionally, please refer to the [CONTRIBUTING.md](https://github.com/aaronleopold/music-menubar/blob/main/CONTRIBUTING.md) for more general information.
