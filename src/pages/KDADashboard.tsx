import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, store } from "@/src/redux/Store";
import DefaultLayout from "@/src/components/DefaultLayout";
import { loadKDAKeys, getKDABalance } from "@/src/utils/Kadena";
import { setBalance } from "@/src/redux/KDAWalletStateSlice";
import Button from "@/src/components/Button";
import KDAChainSelector from "@/src/components/KDAChainSelector";

const KDADashboard = () => {
  let chain = useSelector((state: RootState) => state.KDAWalletState.chainId);
  let balance = useSelector((state: RootState) => state.KDAWalletState.balance);
  // let account = useSelector((state: RootState) => state.KDAWalletState.account);
  // let alias = useSelector((state: RootState) => state.KDAWalletState.alias);
  // let networkName = useSelector((state: RootState) => state.networkState.name);
  let publicKey = useSelector(
    (state: RootState) => state.KDAWalletState.publicKey
  );
  // let secretKey = useSelector(
  //   (state: RootState) => state.KDAWalletState.secretKey
  // );

  const dispatch = useDispatch();

  store.subscribe(() => {
    publicKey = store.getState().KDAWalletState.publicKey;
    chain = store.getState().KDAWalletState.chainId;
    balance = store.getState().KDAWalletState.balance;
  });

  useEffect(() => {
    loadKDAKeys();
    const fetchData = async () => {
      const newBalance = await getKDABalance();
      dispatch(setBalance(newBalance));
    };
    fetchData().catch((e) => {
      console.log(e);
    });
  }, [chain]);

  return (
    <DefaultLayout>
      <h1>KDA Dashboard</h1>
      <p>k:{publicKey}</p>
      <p>
        Chain ID: <KDAChainSelector type="sender" />
      </p>
      <p>Balance: {balance}</p>
      <div>
        <Link to="/KDATransferInput">
          <Button active={true}>Transfer</Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};
export default KDADashboard;
