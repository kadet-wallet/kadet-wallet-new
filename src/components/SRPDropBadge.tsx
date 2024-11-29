import { SRPBadgeProps } from "@/src/components/SRPBadgeProps";
import { useDrop } from "react-dnd";
import { BadgeTypes } from "./BadgeTypes";
import { useSelector } from "react-redux";
import { store, RootState } from "../Redux/store";
import { useState, useEffect } from "react";
import styles from "@/src/components/SRPBadge.module.scss";

const SRPDropBadge = (props: SRPBadgeProps) => {
  let enteredSrp = useSelector((state: RootState) => state.srpState.enteredSrp);

  store.subscribe(()=>{
    enteredSrp = store.getState().srpState.enteredSrp
  });
  
  const [phrase, setPhrase] = useState("");

  const [_, drop] = useDrop(
    () => ({
      accept: BadgeTypes.DRAG_BADGE,
      drop: () => ({ num: props.num }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        //canDrop: monitor.canDrop(),
      }),
      canDrop: (_: any) => {
        return !!(phrase === "");
      },
    }), [phrase]
  );

  useEffect(() => {
    setPhrase(enteredSrp[props.num])
  });

  return (
    <div ref={drop} className={styles.parent}>
      <div className={styles.badge}>
        <div>{props.num + 1}: </div>
        <div className={styles.phrase}>{phrase}</div>
      </div>
    </div>
  );
};
export default SRPDropBadge;
