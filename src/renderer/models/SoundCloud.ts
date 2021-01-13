import { types } from "mobx-state-tree";

export const SoundCloud = types
  .model({
    clientId: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setClientId(value: string) {
      self.clientId = value;
    },
  }));
