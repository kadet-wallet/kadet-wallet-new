import { store } from "@/src/redux/Store";
import { setCorrectSrp } from "@/src/redux/SrpStateSlice";
import { decrypt, encrypt } from "@/src/utils/Crypto";
import { genKeys } from "@/src/utils/Kadena";

export const saveSRP = () => {
  const srp = store.getState().srpState.enteredSrp;
  const pass = store.getState().passwordState.password;
  const encrypted = encryptSRP(srp, pass);

  chrome.storage.local.set({
    encryptedSRP: encrypted,
  });
  console.log("Saved SRP: " + srp);
};

export const loadSRP = () => {
  const pass = store.getState().passwordState.password;

  chrome.storage.local.get("encryptedSRP", (value) => {
    const decrypted = decryptSRP(value.encryptedSRP, pass);
    console.log(decrypted);
    store.dispatch(setCorrectSrp(decrypted));
    genKeys();
  });
};

const encryptSRP = (srp: string[], password: string) => {
  return encrypt(srp.join(" "), password);
};

const decryptSRP = (encryptedSRP: string, password: string): string[] => {
  const decrypted = decrypt(encryptedSRP, password).split(" ");
  return decrypted;
};
