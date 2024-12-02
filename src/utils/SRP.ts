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
    // console.log(value);
    const srp: string[] = value.encryptedSRP;
    // console.log(srp);
    const decrypted = decryptSRP(srp, pass);
    console.log(decrypted);
    store.dispatch(setCorrectSrp(decrypted));
    genKeys();
  });
};

const encryptSRP = (SRP: string[], password: string) => {
  const encryptedSRP: string[] = [];
  SRP.map((item) => encryptedSRP.push(encrypt(item, password)));
  return encryptedSRP;
};

const decryptSRP = (encryptedSRP: string[], password: string): string[] => {
  const decryptedSRP: string[] = [];
  //console.log(encryptedSRP);
  encryptedSRP.map((item) => {
    decryptedSRP.push(decrypt(item, password));
  });
  // console.log(decryptedSRP);
  return decryptedSRP;
};
