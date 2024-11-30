import { store } from "@/src/redux/Store";
import { setEnteredSrp, setShuffledSrpIndex } from "@/src/redux/SrpStateSlice";

export const resetSrp = () => {
  const srp = Array(24).fill("");
  store.dispatch(setShuffledSrpIndex(0));
  store.dispatch(setEnteredSrp(srp));
};
