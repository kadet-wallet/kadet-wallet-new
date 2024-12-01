import { useDispatch } from "react-redux";
import { setChainId } from "@/src/redux/KDAWalletStateSlice";
import { setReceiverChainId } from "../redux/KDATransferStateSlice";

export type KDACHainSelectProps = {
  type: "sender" | "receiver";
};

const KDAChainSelector = (props: KDACHainSelectProps) => {
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (props.type === "sender") {
      dispatch(setChainId(e.target.value));
    } else {
      dispatch(setReceiverChainId(e.target.value));
    }
  };
  return (
    <select onChange={onChange} defaultValue="1">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
    </select>
  );
};

export default KDAChainSelector;
