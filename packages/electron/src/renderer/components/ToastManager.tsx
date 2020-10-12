import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import React from "react";
import { useMst } from "../models";
import { Bread } from "../types";

type ToastProps = { onDelete(): void } & Bread;

function Toast({ title, onDelete }: ToastProps) {
  return (
    <motion.div
      className="w-screen max-w-md z-50"
      initial={{ translateX: "100%" }}
      animate={{ translateX: 0 }}
      exit={{ translateX: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 w-screen px-2">
        <div className="p-2 rounded-lg bg-green-600 shadow-lg">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center text-white">
              {title}
            </div>

            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                onClick={onDelete}
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-500 transition ease-in-out duration-150"
                aria-label="Dismiss"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default observer(({ children }: { children: React.ReactNode }) => {
  const store = useMst();

  const { toasts } = store.player;

  return (
    <div id="toast-manager">
      {children}
      {toasts.length > 0 &&
        toasts.map((toast) => {
          return (
            // @ts-ignore yes, i can enfore this type
            <Toast
              key={toast.title}
              {...toast}
              onDelete={() => store.player.removeToast(toast)}
            />
          );
        })}
    </div>
  );
});
