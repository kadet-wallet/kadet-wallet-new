import Pact from "pact-lang-api";
import { ChainwebChainId, ICommandResult } from "@kadena/chainweb-node-client";
import {
  IContinuationPayloadObject,
  isSignedTransaction,
  Pact as P,
  readKeyset,
} from "@kadena/client";
import { sign } from "@kadena/cryptography-utils";
import {
  ChainId,
  ICommand,
  ISignatureJson,
  IUnsignedCommand,
} from "@kadena/types";
//import { getAccountInfo, creationTime } from './utils/utils';
import * as bip39 from "bip39";
import { restoreKeyPairFromSecretKey } from "@kadena/cryptography-utils";
import { store } from "@/src/redux/Store";
import { setPublicKey, setSecretKey } from "@/src/redux/KDAWalletStateSlice";
import { creationTime } from "@/src/utils/CreationTime";
import { createClient } from "@kadena/client";

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

export async function transfer(receiver: string, amount: string) {
  const { networkId, chainId, apiHost } = getAccountInfo();

  const KEY_PAIR = {
    publicKey: store.getState().KDAWalletState.publicKey,
    secretKey: store.getState().KDAWalletState.secretKey,
  };
  const sender = "k:" + KEY_PAIR.publicKey;
  const cmd = {
    networkId: networkId,
    keyPairs: [
      Object.assign(KEY_PAIR, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap(
            "Transfer",
            "Capability to allow coin transfer",
            "coin.TRANSFER",
            [sender, receiver, { decimal: amount }]
          ).cap,
        ],
      }),
    ],
    pactCode: `(coin.transfer "${sender}" "${receiver}" ${amount})`,
    envData: {},
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 800,
      chainId: chainId,
      gasPrice: 0.0000001,
      sender: sender,
    },
  };

  const response = await Pact.fetch.send(cmd, apiHost);
  // console.log(response);
  if (response.requestKeys !== undefined) {
    console.log(`\nRequest key: ${response.requestKeys[0]}`);
    console.log("Transaction pending...");

    const txResult = await Pact.fetch.listen(
      { listen: response.requestKeys[0] },
      apiHost
    );
    console.log("Transaction mined!");
    console.log(txResult);

    //return txResult;
    if (txResult.result.status === "failure") return false;
    return true;
  } else return false; //return 'Error. Do you have any funds in your account?';
}

// Cross-chain transfer. Uses multiple methods.

// This code is written differently from the rest, using the transaction builder API from github.com/kadena-community/kadena.js
// It is derived from  https://github.com/kadena-community/kadena.js/blob/main/packages/libs/client-examples/src/example-contract/crosschain-transfer.ts
// This is as opposed to the rest of this application whose code was derived from the Pact-Lang-API Cookbook found at https://docs.kadena.io/build/frontend/pact-lang-api-cookbook
export interface IAccount {
  account: string;
  publicKey: string;
  chainId: ChainId;
  guard: string;
}

const NETWORK_ID = store.getState().networkState.networkId;

const inspect =
  (tag: string): (<T extends unknown>(data: T) => T) =>
  <T extends any>(data: T): T => {
    console.log(tag, data);
    return data;
  };

// you can edit this function if you want to use different network like dev-net or a private net
const apiHostGenerator = ({
  networkId,
  chainId,
}: {
  networkId: string;
  chainId: ChainId;
}): string => {
  switch (networkId) {
    case "mainnet01":
      return `https://api.chainweb.com/chainweb/0.0/${networkId}/chain/${
        chainId ?? "1"
      }/pact`;
    case "fast-development":
      return `http://localhost:8080/chainweb/0.0/${networkId}/chain/${
        chainId ?? "1"
      }/pact`;
    case "testnet04":
    default:
      return `https://api.testnet.chainweb.com/chainweb/0.0/${networkId}/chain/${
        chainId ?? "1"
      }/pact`;
  }
};

// configure the client
const {
  listen,
  submit,
  //  preflight,
  //  dirtyRead,
  pollCreateSpv,
  pollStatus,
  //  getStatus,
  //  createSpv,
} = createClient(apiHostGenerator);

function startInTheFirstChain(
  from: IAccount,
  to: IAccount,
  amount: string
): IUnsignedCommand {
  return P.builder
    .execution(
      // @ts-ignore
      P.modules.coin.defpact["transfer-crosschain"](
        from.account,
        to.account,
        readKeyset("receiver-guard"),
        to.chainId,
        {
          decimal: amount.toString(),
        }
      )
    )
    .addSigner(from.publicKey, (withCapability: any) => [
      // in typescript this function suggests you only relevant capabilities
      withCapability("coin.GAS"),
      withCapability(
        "coin.TRANSFER_XCHAIN",
        from.account,
        to.account,
        {
          decimal: amount,
        },
        to.chainId
      ),
    ])
    .addKeyset("receiver-guard", "keys-all", to.publicKey)
    .setMeta({ chainId: from.chainId, senderAccount: from.account })
    .setNetworkId(NETWORK_ID)
    .createTransaction();
}

function finishInTheTargetChain(
  continuation: IContinuationPayloadObject["cont"],
  targetChainId: ChainId,
  gasPayer: string = "kadena-xchain-gas"
): IUnsignedCommand {
  const builder = P.builder
    .continuation(continuation)
    .setNetworkId(NETWORK_ID)
    // uncomment this if you want to pay gas yourself
    // .addSigner(gasPayer.publicKey, (withCapability) => [
    //   withCapability('coin.GAS'),
    // ])
    .setMeta({
      chainId: targetChainId,
      senderAccount: gasPayer,
      // this need to be less than or equal to 850 if you want to use gas-station, otherwise the gas-station does not pay the gas
      gasLimit: 850,
    });

  return builder.createTransaction();
}

async function signCommand(
  transaction: IUnsignedCommand,
  senderPubkey: string,
  senderSecret: string
) {
  const cmd: ICommand = {
    cmd: transaction.cmd,
    hash: transaction.hash,
    sigs: [
      sign(transaction.cmd, {
        secretKey: senderSecret,
        publicKey: senderPubkey,
      }) as ISignatureJson,
    ],
  };
  return cmd;
}

async function doCrossChainTransfer(
  from: IAccount,
  to: IAccount,
  amount: string,
  senderSecret: string
): Promise<Record<string, ICommandResult>> {
  return (
    Promise.resolve(startInTheFirstChain(from, to, amount))
      .then((command) => {
        return signCommand(command, from.publicKey, senderSecret);
      })
      .then((command) =>
        isSignedTransaction(command)
          ? command
          : Promise.reject("CMD_NOT_SIGNED")
      )
      // inspect is only for development you can remove them
      .then(inspect("EXEC_SIGNED"))
      .then((cmd) => submit(cmd))
      .then(inspect("SUBMIT_RESULT"))
      .then(listen)
      .then(inspect("LISTEN_RESULT"))
      .then((status) =>
        status.result.status === "failure"
          ? Promise.reject(new Error("DEBIT REJECTED"))
          : status
      )
      .then((status) =>
        Promise.all([
          status,
          pollCreateSpv(
            {
              requestKey: status.reqKey,
              networkId: NETWORK_ID,
              chainId: from.chainId,
            },
            to.chainId
          ),
        ])
      )
      .then(inspect("POLL_SPV_RESULT"))
      .then(
        ([status, proof]) =>
          finishInTheTargetChain(
            {
              pactId: status.continuation?.pactId as string,
              proof,
              rollback: false,
              step: 1,
            },
            to.chainId
          ) as ICommand
      )
      .then(inspect("CONT_TR"))
      // // uncomment the following lines if you want to pay gas from your account not the gas-station
      // .then((command) => signWithChainweaver(command))
      // .then((command) =>
      //   isSignedTransaction(command) ? command : Promise.reject('CMD_NOT_SIGNED'),
      // )
      // .then(inspect('CONT_SIGNED'))
      .then((cmd) => submit(cmd))
      .then(inspect("SUBMIT_RESULT"))
      .then(pollStatus)
      .then(inspect("FINAL_RESULT"))
  );
}

export function transferCrossChain(
  receiverName: string,
  receiverPubkey: string,
  amount: string,
  chain: string
) {
  const senderPubkey = store.getState().KDAWalletState.publicKey;
  const senderSecret = store.getState().KDAWalletState.secretKey;

  const from: IAccount = {
    account: "k:" + senderPubkey,
    chainId: store.getState().KDAWalletState.chainId as ChainwebChainId,
    publicKey: senderPubkey,
    // use keyset guard
    guard: senderPubkey,
  };

  const to: IAccount = {
    account: receiverName, // k:account of sender
    chainId: chain as ChainwebChainId,
    publicKey: receiverPubkey,
    // use keyset guard
    guard: receiverPubkey,
  };

  return doCrossChainTransfer(from, to, amount, senderSecret);
}
// End cross-chain transfer commands.
