import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { useMst } from '../../models';
import { YTPlaylist } from '../../models/YouTube';
import CreatePlaylistModal from './CreatePlaylistModal';
import useToggle from '../utils/useToggle';
import ListHeader from './ListHeader';
import Playlist from './ListItem';

type DroppableProps = {
  playlists: Instance<typeof YTPlaylist>[];
  dark: boolean;
};

const DroppableList = observer(
  ({
    provided,
    playlists,
    dark,
  }: { provided: DroppableProvided } & DroppableProps) => (
    <div className="divide-y overflow-y-scroll">
      <ul
        {...provided.droppableProps}
        ref={provided.innerRef}
        className={clsx(
          dark ? 'divide-gray-800' : 'divide-gray-200',
          'divide-y'
        )}
      >
        {playlists.map((playlist, index) => (
          <React.Fragment key={index}>
            <Draggable draggableId={String(index)} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Playlist
                    to={`playlist/play/${index}`}
                    toEdit={`playlist/settings/${index}`}
                    key={index}
                    name={playlist.name}
                    dark={dark}
                  />
                </div>
              )}
            </Draggable>
          </React.Fragment>
        ))}
        {provided.placeholder}
      </ul>
    </div>
  )
);

export default observer(() => {
  const store = useMst();

  const { youtube } = store.player;
  const dark = store.player.theme === 'dark';

  const [open, { toggle, off }] = useToggle(false);

  return (
    <React.Fragment>
      {store.player.youtube.playlists.length > 0 ? (
        <React.Fragment>
          <CreatePlaylistModal open={open} onClose={off} />
          <ListHeader title="Playlists" toggleCreate={toggle} />
          <DragDropContext
            onDragEnd={(result) => {
              if (result.destination) {
                youtube.reorderPLaylists(
                  result.source.index,
                  result.destination.index
                );
              }
            }}
          >
            <Droppable droppableId="actions">
              {(provided) => (
                <DroppableList
                  provided={provided}
                  playlists={store.player.youtube.playlists}
                  dark={dark}
                />
              )}
            </Droppable>
          </DragDropContext>
        </React.Fragment>
      ) : (
        <div className="flex justify-center items-center h-64">
          <h3>Add a playlist to get started!</h3>
        </div>
      )}
    </React.Fragment>
  );
});
