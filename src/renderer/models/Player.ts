import { destroy, Instance, types } from "mobx-state-tree";
import { YouTube } from "./YouTube";
import { Spotify } from "./Spotify";
import { Toast } from "./Toast";
import { Bread } from "../types";
import { LocalLibrary } from "./LocalLibrary";

export const Player = types
  .model({
    token: types.maybeNull(types.string),
    theme: types.optional(types.string, "light"),

    // is this bad practice?
    spotify: types.optional(Spotify, () => Spotify.create({})),
    youtube: types.optional(YouTube, () => YouTube.create({})),
    local: types.optional(LocalLibrary, () => LocalLibrary.create({})),

    toasts: types.optional(types.array(Toast), []),
  })
  .actions((self) => ({
    setToken(value: string | null) {
      self.token = value;
    },
    setTheme(value: string) {
      self.theme = value;
    },
    addToast({ title, status }: Bread) {
      self.toasts.clear();

      const toast = Toast.create({
        title,
        status,
      });

      self.toasts.push(toast);

      // returning to use in deletion
      return toast;
    },
    removeToast(toast: Instance<typeof Toast>) {
      destroy(toast);
    },
  }));
