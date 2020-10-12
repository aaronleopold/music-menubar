import { types } from "mobx-state-tree";

export const Spotify = types
  .model({
    clientId: types.optional(types.string, ""),
    clientSecret: types.optional(types.string, ""),
    token: types.maybeNull(types.string),
    refreshToken: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setClientId(value: string) {
      self.clientId = value;
    },
    setClientSecret(value: string) {
      self.clientSecret = value;
    },
    setToken(value: string | null) {
      self.token = value;
    },
    setRefreshToken(value: string | null) {
      self.refreshToken = value;
    },
  }));
