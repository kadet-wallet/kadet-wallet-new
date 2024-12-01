import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface KDAWalletState {
  chainId: string;
  balance: number;
  // account: string;
  // alias: string;
  publicKey: string;
  secretKey: string;
  // wallets: RawWallet[]; // TODO: Ask Hadi what this is all about...
  // connectedSites: string[];
}

const initialState: KDAWalletState = {
  chainId: "1",
  balance: 0,
  // account: "",
  // alias: "",
  publicKey: "",
  secretKey: "",
  // connectedSites: [], // TODO: Ask Hadi about these...
};

export const KDAWalletStateSlice = createSlice({
  name: "KDAWalletState",
  initialState,
  reducers: {
    setChainId: (state, action: PayloadAction<string>) => {
      state.chainId = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    // setAccount: (state, action: PayloadAction<string>) => {
    //   state.account = action.payload;
    // },
    // setAlias: (state, action: PayloadAction<string>) => {
    //   state.alias = action.payload;
    // },
    setPublicKey: (state, action: PayloadAction<string>) => {
      state.publicKey = action.payload;
    },
    setSecretKey: (state, action: PayloadAction<string>) => {
      state.secretKey = action.payload;
    },
    // setConnectedSites: (state, action: PayloadAction<string[]>) => {
    //   state.connectedSites = action.payload;
    // },
  },
});

export const {
  setChainId,
  setBalance,
  // setAccount,
  // setAlias,
  setPublicKey,
  setSecretKey,
  // setConnectedSites,
} = KDAWalletStateSlice.actions;

export default KDAWalletStateSlice.reducer;
