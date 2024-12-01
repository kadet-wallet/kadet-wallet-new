import { configureStore } from "@reduxjs/toolkit";
import SrpStateSliceReducer from "./SrpStateSlice";
import PasswordStateSliceReducer from "./PasswordStateSlice";
import NetworkStateSliceReducer from "./KDANetworkStateSlice";
import WalletStateReducer from "./KDAWalletStateSlice";
import TransferStateReducer from "./KDATransferStateSlice";

export const store = configureStore({
  reducer: {
    srpState: SrpStateSliceReducer,
    passwordState: PasswordStateSliceReducer,
    networkState: NetworkStateSliceReducer,
    KDAWalletState: WalletStateReducer,
    transferState: TransferStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
