import { StoredPasswordHash } from "@/src/utils/Crypto";
import { store } from "@/src/redux/Store";

export const storePasswordHash = () => {
  const password = store.getState().passwordState.password;
  const storedPass = new StoredPasswordHash(password);
  chrome.storage.local.set({ storedPassword: JSON.stringify(storedPass) });
  console.log("storedPassword set to " + JSON.stringify(storedPass));
};
