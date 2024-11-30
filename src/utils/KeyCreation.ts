import { store } from "@/src/redux/Store";
import { setPublicKey, setSecretKey } from "@/src/redux/WalletStateSlice";
import { getKadenaKeysFromMnemonic, encrypt } from "@/src/utils/Crypto";

export const handleKeyCreation = () => {
  const srp = store.getState().srpState.enteredSrp;
  const pass = store.getState().passwordState.password;

  const keys = getKadenaKeysFromMnemonic(srp.join(" "));
  store.dispatch(setPublicKey(keys.publicKey));
  store.dispatch(setSecretKey(keys.secretKey as string));

  chrome.storage.local.set({
    privateKey: encrypt(keys.publicKey, pass),
  });
  chrome.storage.local.set({
    publicKey: encrypt(keys.privateKey, pass),
  });
};
