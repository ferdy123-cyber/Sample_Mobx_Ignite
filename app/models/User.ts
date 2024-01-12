import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "app/services/api"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    loading: types.optional(types.boolean, false),
    listUser: types.array(types.frozen<any>()),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async getListUser() {
      // fetching
      store.setProp("loading", true)
      const response = await api.getListUser()
      if (response.kind !== "ok") {
        // eror request
        store.setProp("loading", false)
        return
      }
      store.setProp("listUser", response.data)
      store.setProp("loading", false)
      // success request
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
