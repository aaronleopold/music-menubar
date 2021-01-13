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
import { YTStream } from '../../models/YouTube';
import CreateStreamModal from './CreateStreamModal';
import useToggle from '../utils/useToggle';
import ListHeader from './ListHeader';
import Stream from './ListItem';

type DroppableProps = {
  streams: Instance<typeof YTStream>[];
  dark: boolean;
};

const DroppableList = observer(
  ({
    provided,
    streams,
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
        {streams.map((stream, index) => (
          <React.Fragment key={index}>
            <Draggable draggableId={String(index)} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Stream
                    to={`stream/play/${index}`}
                    toEdit={`stream/settings/${index}`}
                    key={index}
                    name={stream.name}
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
      {store.player.youtube.streams.length > 0 ? (
        <React.Fragment>
          <CreateStreamModal open={open} onClose={off} />
          <ListHeader title="Streams" toggleCreate={toggle} />
          <DragDropContext
            onDragEnd={(result) => {
              if (result.destination) {
                youtube.reorderStreams(
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
                  streams={store.player.youtube.streams}
                  dark={dark}
                />
              )}
            </Droppable>
          </DragDropContext>
        </React.Fragment>
      ) : (
        <div className="flex justify-center items-center h-64">
          <h3>Add a stream / video to get started!</h3>
        </div>
      )}
    </React.Fragment>
  );
});
