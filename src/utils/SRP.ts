import { store } from "@/src/redux/Store";
import { setCorrectSrp } from "@/src/redux/SrpStateSlice";
import { decryptSRP, encryptSRP } from "@/src/utils/Crypto";

export const saveSRP = () => {
  const srp = store.getState().srpState.enteredSrp;
  const pass = store.getState().passwordState.password;
  const encryptedSRP = encryptSRP(srp, pass);

  chrome.storage.local.set({
    encryptedSRP: encryptedSRP,
  });
};

export const loadSRP = () => {
  const pass = store.getState().passwordState.password;

  chrome.storage.local.get(["encryptedSRP"]).then((value) => {
    const decrypted = decryptSRP(value.encryptedSRP, pass);
    store.dispatch(setCorrectSrp(decrypted));
    console.log("Loaded SRP: " + decrypted);
  });
};
