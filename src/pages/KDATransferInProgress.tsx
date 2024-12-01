import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "@/src/redux/Store";
import DefaultLayout from "@/src/components/DefaultLayout";
import Button from "@/src/components/Button";
import { setReceiverPublicKey } from "@/src/redux/KDATransferStateSlice";
import { transfer, transferCrossChain } from "@/src/utils/Kadena";

const KDATransferInProgress = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [success, setIsSuccess] = useState(false);

  const amount = useSelector((state: RootState) => state.transferState.amount);

  const receiver = useSelector(
    (state: RootState) => state.transferState.receiver
  );
  const senderChainId = useSelector(
    (state: RootState) => state.KDAWalletState.chainId
  );
  const receiverChainId = useSelector(
    (state: RootState) => state.transferState.receiverChainId
  );
  const receiverPublicKey = useSelector(
    (state: RootState) => state.transferState.receiverPublicKey
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (senderChainId === receiverChainId) {
      transfer(receiver, amount).then((value) => {
        setIsFinished(true);
        setIsSuccess(value);
      });
    } else {
      transferCrossChain(receiver, receiverPublicKey, amount, receiverChainId)
        .then((value) => {
          console.log(value);
          setIsFinished(true);
          setIsSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setIsFinished(true);
          setIsSuccess(false);
        })
        .finally(() => dispatch(setReceiverPublicKey("")));
    }
  }, []);

  return (
    <DefaultLayout>
      <h1>Transferring</h1>
      <p>
        {!isFinished && "Underway"}
        {isFinished && "Done"}
        {isFinished && success && "... Success!"}
        {isFinished && !success && "... Failure"}
      </p>
      <p>
        {isFinished && (
          <Link to="/Dashboard">
            <Button active={true}>Dashboard</Button>
          </Link>
        )}
      </p>
    </DefaultLayout>
  );
};

export default KDATransferInProgress;
