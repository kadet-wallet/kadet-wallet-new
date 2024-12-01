import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { store, RootState } from "@/src/redux/Store";
import DefaultLayout from "@/src/components/DefaultLayout";
import KDAChainSelector from "@/src/components/KDAChainSelector";
import Button from "@/src/components/Button";
import {
  setAmount,
  setReceiver,
  setReceiverPublicKey,
} from "../redux/KDATransferStateSlice";

const KDATransferInput = () => {
  const dispatch = useDispatch();

  let senderChain = useSelector(
    (state: RootState) => state.KDAWalletState.chainId
  );

  let receiver = useSelector(
    (state: RootState) => state.transferState.receiver
  );

  let receiverChain = useSelector(
    (state: RootState) => state.transferState.receiverChainId
  );

  let receiverPublicKey = useSelector(
    (state: RootState) => state.transferState.receiverPublicKey
  );

  let amount = useSelector((state: RootState) => state.transferState.amount);

  store.subscribe(() => {
    senderChain = store.getState().KDAWalletState.chainId;
    receiverChain = store.getState().transferState.receiverChainId;
    receiver = store.getState().transferState.receiver;
    amount = store.getState().transferState.amount;
  });
  const [isCrossChain, setIsCrossChain] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const xchain = !(senderChain === receiverChain);
    setIsCrossChain(() => !(senderChain === receiverChain));

    if (receiver.startsWith("k:")) {
      dispatch(setReceiverPublicKey(receiver.slice(2)));
    }

    const numericAmount = Number(amount);

    // if (isNaN(numericAmount)) {
    //   dispatch(setAmount("0"));
    // }

    // if (Number.isInteger(numericAmount)) {
    //   const newAmount = (amount += ".0");
    //   dispatch(setAmount(newAmount)); // This is because Kadena rejects round numbers without a .0 at the end...
    // }

    if (
      (isCrossChain &&
        !receiver.startsWith("k:") &&
        receiverPublicKey === "") ||
      isNaN(numericAmount) ||
      receiver === ""
    ) {
      console.log(
        "Not valid- Crosschain " +
          xchain +
          ", amount: " +
          amount +
          ", receiver: " +
          receiver +
          ", receiverPublicKey: " +
          receiverPublicKey +
          ", senderChain " +
          senderChain +
          ", receiverChain: " +
          receiverChain
      );
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [senderChain, receiverChain, receiver, amount, receiverPublicKey]);

  return (
    <DefaultLayout>
      <h1>Transfer KDA</h1>
      <p>Enter the transaction details:</p>
      <p>
        Amount:{" "}
        <input
          type="text"
          onChange={(event) => dispatch(setAmount(event.target.value))}
        />
      </p>
      <p>
        Sender chain: <KDAChainSelector type="sender" />
      </p>
      <p>
        Receiver:{" "}
        <input
          type="text"
          onChange={(event) => dispatch(setReceiver(event.target.value))}
        />
      </p>
      <p>
        Receiver chain: <KDAChainSelector type="receiver" />
      </p>
      {isCrossChain &&
        !(receiver === "") &&
        !(receiver === "k") &&
        !receiver.startsWith("k:") && (
          <p>
            Receiver public key:{" "}
            <input
              type="text"
              onChange={(event) =>
                dispatch(setReceiverPublicKey(event.target.value))
              }
            />
          </p>
        )}
      <div>
        {isValid && (
          <Link to="/KDATransferInProgress">
            <Button active={true}>Send</Button>
          </Link>
        )}
        {!isValid && <Button active={false}>Send</Button>}
      </div>
    </DefaultLayout>
  );
};

export default KDATransferInput;
