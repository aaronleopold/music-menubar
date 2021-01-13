import React from 'react';
import useToggle from '../utils/useToggle';
import FocusTrap from '../ui/FocusTrap';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  loaded: boolean;
};

function PlayerContentFull() {
  return <div></div>;
}

function PlayerContentMinimized() {}

function PlayerContent({ open }: { open: boolean }) {
  if (open) {
    return <PlayerContentFull />;
  } else {
  }
}

// TODO: add howler logic here
export default function LocalPlayer({ loaded }: Props) {
  const [open, { on, off }] = useToggle(false);

  if (!loaded) {
    // I need to change the props name here away from loaded, but essentially
    // if there is no selected item this session 'loaded' will be false.
    // once a song has been selected, this will continue to be 'loaded' until app
    // exit or leave local library
    return <div className="hidden"></div>;
  }

  return (
    <AnimatePresence>
      {open ? (
        <FocusTrap key="full-screen">
          <div className="z-30 absolute inset-x-0">
            <motion.div
              initial={{ y: 0 }}
              animate={{ translateY: '-100%' }}
              exit={{ translateY: 50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative bg-white overflow-hidden w-full"
            >
              <div className="full-minus-header p-4 pb-4 relative">
                <div className="absolute top-0 right-4 mt-4">
                  <button
                    className="block cursor-pointer hover:bg-gray-400 rounded-full p-2 focus:outline-none transition-colors duration-150"
                    onClick={off}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
                currentplayingstuffs
              </div>
            </motion.div>
          </div>
        </FocusTrap>
      ) : (
        <div
          className="fixed flex items-center justify-center bottom-0 h-12 bg-white w-full px-6"
          key="non-full"
        >
          <div className="w-8"></div>
          <div className="flex-1 justify-center text-center">testing123</div>
          <div className="w-8 justify-center">
            <button
              className="block cursor-pointer hover:bg-gray-400 rounded-full p-2 focus:outline-none transition-colors duration-150"
              onClick={on}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
