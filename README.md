# music-menubar (electron)

## Installation & Startup

Navigate to the `packages/electron` directory and run the following:

```bash
yarn
yarn dev
```

## Usage

Off the bat, this will come preloaded with three playlists and one stream. All of the preloaded items are Lofi, so if that's not your thing you can just delete them. To link new items, all that is required is pasting an appropriate link and assigning a name.

In the event that the URL parsing fails, you'll need to grab the ID from the URL manually. For playlists, this is the value that comes immediately after `?list=`, and for videos / streams this is the value that comes immediately after `?v=`.

For example, let's say you wanted to add the following playlist:

`https://www.youtube.com/playlist?list=PLm5pKYShxnXB1g2LixFdKxjAvl3P2O4Hm`

The ID to extract here is: `PLm5pKYShxnXB1g2LixFdKxjAvl3P2O4Hm`

Now, lets say you love this video:

`https://www.youtube.com/watch?v=rCFmLjGq3Jg`

The ID to extract here is `rCFmLjGq3Jg`.
