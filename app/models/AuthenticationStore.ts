import { api } from "app/services/api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Toast } from "native-base"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    profile: types.frozen<any>(),
    loginFetch: types.optional(types.boolean, false),
    // types.frozen<any>() => type untuk object,
    // types.array(types.frozen<any>()) => type untuk array,
    // types.optional(types.boolean, false) => type untuk boolean
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.profile
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    async sample() {
      // fetching
      const response = await api.sample({})
      if (response.kind !== "ok") {
        // eror request
        return
      }
      // success request
    },
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    logout() {
      store.profile = undefined
      store.authEmail = ""
    },
    async login(data: object) {
      // fetching
      store.setProp("loginFetch", true)
      const response = await api.login(data)
      console.log(response)
      if (response.kind !== "ok") {
        // eror request
        store.setProp("loginFetch", false)
        return
      }
      store.setProp("loginFetch", false)
      store.setProp("profile", response.data)
      // success request
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
