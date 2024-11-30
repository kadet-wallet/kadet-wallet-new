import { StoredPasswordHash, comparePasswordToHash } from "@/src/utils/Crypto";
import { store } from "@/src/redux/Store";
import {
  setIsPasswordValid,
  setPasswordError,
} from "@/src/redux/PasswordStateSlice";

export function checkPasswordHash(password: string) {
  chrome.storage.local.get(["storedPassword"]).then((result) => {
    const storedPassword = result.storedPassword;
    //console.log(storedPassword);
    if (storedPassword === undefined || storedPassword === null) {
      store.dispatch(setPasswordError("No stored password"));
      store.dispatch(setIsPasswordValid(false));
    } else {
      const storedPasswordObj: StoredPasswordHash = JSON.parse(storedPassword);
      if (comparePasswordToHash(password, storedPasswordObj) === true) {
        //console.log('Found the correct password!');
        store.dispatch(setIsPasswordValid(true));
      } else {
        store.dispatch(setIsPasswordValid(false));
        // console.log('Wrong password');
      }
    }
  });
}
