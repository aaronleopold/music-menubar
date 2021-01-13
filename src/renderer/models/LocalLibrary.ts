import { types } from "mobx-state-tree";

export const LocalLibrary = types
  .model({
    path: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setPath(value: string) {
      self.path = value;
    },
  }));
