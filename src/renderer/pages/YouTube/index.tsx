import React from 'react';
import Header from '../../components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Playlists from '../../components/YT/Playlists';
import Streams from '../../components/YT/Streams';
import YTPlaylistPlayer from './YTPlaylistPlayer';
import YTPlaylistSettings from './YTPlaylistSettings';
import YTStreamPlayer from './YTStreamPlayer';
import YTStreamSettings from './YTStreamSettings';
import YTFavorites from './YTFavorites';
import PageLayout from '../../components/PageLayout';
import FavoriteButton from '../../components/ui/buttons/FavoriteButton';

// TODO: code split!!

function Home() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Header
        title="YouTube"
        action={<FavoriteButton onClick={() => navigate('favorites')} />}
      />
      <Playlists />
      <Streams />
    </PageLayout>
  );
}

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="favorites" element={<YTFavorites />} />
      <Route path="playlist/play/:index" element={<YTPlaylistPlayer />} />
      <Route path="playlist/settings/:index" element={<YTPlaylistSettings />} />
      <Route path="stream/play/:index" element={<YTStreamPlayer />} />
      <Route path="stream/settings/:index" element={<YTStreamSettings />} />
    </Routes>
  );
}
