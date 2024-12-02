import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CopyToClipBoard from "react-copy-to-clipboard";
import { RootState, store } from "@/src/redux/Store";
import DefaultLayout from "@/src/components/DefaultLayout";
import { getBalance, truncatePublicKey } from "@/src/utils/Kadena";
import { setBalance } from "@/src/redux/KDAWalletStateSlice";
import Button from "@/src/components/Button";
import KDAChainSelector from "@/src/components/KDAChainSelector";
// import { loadSRP } from "@/src/utils/SRP";

const KDADashboard = () => {
  let chain = useSelector((state: RootState) => state.KDAWalletState.chainId);
  let balance = useSelector((state: RootState) => state.KDAWalletState.balance);
  let publicKey = useSelector(
    (state: RootState) => state.KDAWalletState.publicKey
  );
  let srp = useSelector((state: RootState) => state.srpState.correctSrp);
  const [balanceFound, setBalanceFound] = useState(false);

  const dispatch = useDispatch();

  store.subscribe(() => {
    publicKey = store.getState().KDAWalletState.publicKey;
    chain = store.getState().KDAWalletState.chainId;
    balance = store.getState().KDAWalletState.balance;
    srp = store.getState().srpState.correctSrp;
  });

  useEffect(() => {
    console.log(srp);
    const fetchData = async () => {
      try {
        const newBalance = await getBalance();
        dispatch(setBalance(newBalance));
        setBalanceFound(true);
      } catch (e) {
        setBalanceFound(false);
      }
    };
    fetchData().catch((_) => {
      setBalanceFound(false);
    });
  }, [chain]);

  return (
    <DefaultLayout>
      <h1>KDA Dashboard</h1>
      <p>k:{truncatePublicKey(publicKey)}</p>
      <div>
        <CopyToClipBoard text={"k:" + publicKey}>
          <Button active={true}>Copy</Button>
        </CopyToClipBoard>
      </div>
      <p>
        Chain ID: <KDAChainSelector type="sender" />
      </p>
      <p>
        Balance: {balanceFound && balance}
        {!balanceFound && "No balance"}
      </p>
      <div>
        <Link to="/KDATransferInput">
          <Button active={true}>Transfer</Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};
export default KDADashboard;
