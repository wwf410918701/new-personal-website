import globalUiStore from "./globalUiStore";
import userStore from "./userStore";

class RootStore {
  userStore
  globalUiStore

  constructor() {
    this.userStore = new userStore(this)
    this.globalUiStore = new globalUiStore(this)
  }
}

export default RootStore;