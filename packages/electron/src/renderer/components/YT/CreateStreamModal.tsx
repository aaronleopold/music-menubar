import React, { useState } from "react";
import Modal, { ModalContent, ModalFooter } from "../ui/Modal";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";
import { parseUrl } from "../../utils";
import Divider from "../ui/Divider";

type ModalProps = {
  open: boolean;
  onClose(): void;
};

export default observer(({ open, onClose }: ModalProps) => {
  const store = useMst();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");

  const [error, setError] = useState("");

  function onParseUrl() {
    const params = parseUrl(url);

    if (params && params.v && typeof params.v === "string") {
      setId(params.v);
    } else {
      // toast notify cannot parse params
      setError("Could not parse URL");
    }
  }

  function onSubmit() {
    store.player.youtube.createStream(name, id);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent
        title={
          <h3 className="text-2xl leading-6 font-medium text-gray-900">
            Create Stream
          </h3>
        }
      >
        <div className="flex flex-col space-y-5 pt-2">
          <div>
            <p className="text-sm text-gray-600">
              This is intended for YouTube streams, however it can be used for
              any individual video so long as you have the id
            </p>
          </div>
          <div>
            <label className="block text-sm leading-5 font-medium text-gray-700">
              Stream Name
            </label>

            <input
              className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
              placeholder="Enter the stream name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm leading-5 font-medium text-gray-700">
              Stream ID
            </label>

            <input
              className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
              placeholder="Enter the stream (video) ID here"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <Divider text="Or" />

          <p className="text-sm text-gray-600">
            Paste the URL below to see if we can extract the info for you!
          </p>

          <div>
            <label className="block text-sm leading-5 font-medium text-gray-700">
              Video URL
            </label>

            <div className="flex space-x-2">
              <input
                className="form-input flex-1 mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
                placeholder="Enter your video URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <button
                className="px-3 bg-gray-200 rounded-md text-sm"
                onClick={onParseUrl}
              >
                Parse
              </button>
            </div>

            {error && (
              <p
                onClick={() => setError("")}
                className="text-red-500 text-sm leading-5 cursor-pointer pt-1 ml-1"
              >
                {error}
              </p>
            )}
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="ml-2 shadow-sm relative inline-flex items-center px-4 py-2 border text-base leading-6 rounded-md transition ease-in-out duration-150  border-transparent focus:outline-none  bg-gray-300 hover:bg-gray-500 focus:shadow-outline-gray focus:border-gray-500 active:bg-gray-500"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="ml-2 shadow-sm relative inline-flex items-center px-4 py-2 border text-base leading-6 rounded-md transition ease-in-out duration-150  border-transparent text-white focus:outline-none  bg-green-600 hover:bg-green-500 focus:shadow-outline-green focus:border-green-700 active:bg-green-700"
          >
            Create
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
});
