import React from 'react';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useMst } from '../../../models';
import PageLayout from '../../components/PageLayout';
import Input from '../../components/ui/Input';

export default observer(() => {
  const store = useMst();
  const index = useParams().index;
  const navigate = useNavigate();

  const stream = store.player.youtube.streams[parseInt(index, 10)];

  return (
    <PageLayout>
      <Header
        back="/youtube"
        title={`${stream.name} Settings`}
        action={
          <button
            onClick={() => {
              store.player.youtube.deleteStream(stream);
              navigate('/youtube');
            }}
            className="border-red-600 bg-white dark:bg-transparent hover:bg-red-600 text-red-600  hover:text-white flex justify-between space-x-2 rounded-full border-2 transition-colors focus:outline-none duration-300 text-lg px-2 py-1 items-center font-semibold"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>

            <p className="text-sm">Delete</p>
          </button>
        }
      />
      <div className="p-6 flex flex-col space-y-5">
        <Input
          label="Stream Name"
          placeholder="Enter your client ID here"
          value={stream.name}
          onChange={(e) => stream.changeName(e.target.value)}
        />

        <Input
          label="Stream ID"
          placeholder="Enter your client ID here"
          value={stream.videoId}
          onChange={(e) => stream.setVideoId(e.target.value)}
        />
      </div>
    </PageLayout>
  );
});
