import { makeAutoObservable } from "mobx";
import RootStore from "./rootStore";

class userStore {
  userID: string | null = null;
  userEmail: string | null = null;
  userName: string | null = null;
  rootStore: RootStore | null = null;
  userBlogs: string[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
    this.rootStore = rootStore;
  }

  userLogin(
    userID: string,
    userName: string,
    userEmail: string,
    userBlogs: string[] | null
  ) {
    this.userID = userID;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userBlogs = userBlogs ?? [];
  }

  userLogout() {
    this.userID = null;
    this.userName = null;
    this.userEmail = null;
  }

  updateUserEmail(userEmail: string) {
    this.userEmail = userEmail;
  }

  updateUserName(userName: string) {
    this.userName = userName;
  }
}

export default userStore;
