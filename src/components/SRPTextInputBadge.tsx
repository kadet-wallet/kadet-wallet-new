import { useSelector, useDispatch } from "react-redux";
import { SRPBadgeProps } from "@/src/components/SRPBadgeProps";
import { setEnteredSrp } from "@/src/redux/SrpStateSlice";
import { store, RootState } from "@/src/redux/Store";
import styles from "@/src/styles/Input.module.scss";

const SRPTextInputBadge = (props: SRPBadgeProps) => {
  let enteredSrp = useSelector((state: RootState) => state.srpState.enteredSrp);

  store.subscribe(() => {
    enteredSrp = store.getState().srpState.enteredSrp;
  });

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempSrp = [...enteredSrp];
    tempSrp[props.num] = e.target.value;
    dispatch(setEnteredSrp(tempSrp));
    //console.log(tempSrp);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.badge}>
        <div>{props.num + 1}: </div>
        <div className={styles.phrase}>
          <input
            type="text"
            className={styles.input}
            onChange={onChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default SRPTextInputBadge;
