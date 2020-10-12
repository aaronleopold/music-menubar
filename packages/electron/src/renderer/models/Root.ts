import { types } from "mobx-state-tree";
import { Player } from "./Player";

export const RootModel = types.model({
  player: Player,
});
