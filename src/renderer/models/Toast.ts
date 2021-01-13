import { types } from "mobx-state-tree";

// enum ToastStatus {
//   Success = "success",
//   Error = "error",
// }

export const Toast = types.model({
  title: types.string,
  status: types.string,
});
