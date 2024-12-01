import Pact from "pact-lang-api";
//import { getAccountInfo, creationTime } from './utils/utils';
import * as bip39 from "bip39";
import { restoreKeyPairFromSecretKey } from "@kadena/cryptography-utils";
import { store } from "@/src/redux/Store";
import { setPublicKey, setSecretKey } from "@/src/redux/KDAWalletStateSlice";
import { creationTime } from "@/src/utils/CreationTime";

export const loadKDAKeys = () => {
  const srp = store.getState().srpState.correctSrp;
  const keys = getKadenaKeysFromMnemonic(srp.join(" "));
  store.dispatch(setPublicKey(keys.publicKey));
  store.dispatch(setSecretKey(keys.secretKey));
};

export type KDAAccount = `${"k" | "w"}:${string}` | string;

export const keyFromKDAAccount = (account: KDAAccount): string => {
  return account.split(":")[1];
};

export async function getKDABalance() {
  const publicKey = store.getState().KDAWalletState.publicKey;
  const secretKey = store.getState().KDAWalletState.secretKey;

  const { networkId, chainId, apiHost } = getAccountInfo();

  const account = "k:" + publicKey;
  const KEY_PAIR = {
    publicKey: publicKey,
    secretKey: secretKey,
  };

  const cmd = {
    networkId: networkId,
    keyPairs: KEY_PAIR,
    pactCode: `(coin.get-balance "${account}")`,
    envData: {},
    meta: {
      creationTime: creationTime(),
      ttl: 600,
      gasLimit: 600,
      chainId: chainId,
      gasPrice: 0.0000001,
      sender: KEY_PAIR.publicKey,
    },
  };
  console.log(cmd);
  const result = await Pact.fetch.local(cmd, apiHost);
  console.log(result);
  if (result?.result?.status === "failure") return 0;
  return result?.result?.data as number;
}

const getKadenaKeysFromMnemonic = (mnemonic: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic).toString("hex");
  return restoreKeyPairFromSecretKey(seed.slice(0, 64));
};

const getAccountInfo = () => {
  const networkId = store.getState().networkState.networkId;
  const chainId = store.getState().KDAWalletState.chainId;
  const apiHost =
    store.getState().networkState.url +
    "/chainweb/0.0/" +
    networkId +
    "/chain/" +
    chainId +
    "/pact";
  return { networkId, chainId, apiHost };
};
