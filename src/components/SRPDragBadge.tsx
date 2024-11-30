import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { useState } from "react";
import { store, RootState } from "@/src/Redux/store";
import { setEnteredSrp, setShuffledSrpIndex } from "@/src/Redux/SrpStateSlice";
import styles from "@/src/components/SRPBadge.module.scss";
import { BadgeTypes } from "@/src/components/BadgeTypes"

interface DropResult {
  num: number;
}

const SRPDragBadge = () => {
  const shuffledSrp = useSelector((state: RootState) => state.srpState.shuffledSrp);
  let enteredSrp = useSelector((state: RootState) => state.srpState.enteredSrp);
  let shuffledSrpIndex = useSelector((state: RootState) => state.srpState.shuffledSrpIndex);
  store.subscribe(() => {
    enteredSrp = store.getState().srpState.enteredSrp;
    shuffledSrpIndex = store.getState().srpState.shuffledSrpIndex;
  });
  const [phrase, setPhrase] = useState(shuffledSrp[shuffledSrpIndex]);
  const dispatch = useDispatch();

  const [_, dragRef] = useDrag(
    () => ({
      type: BadgeTypes.DRAG_BADGE,
      //item: { phrase },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          const newSrp = [...enteredSrp];
          newSrp[dropResult.num] = phrase;
          console.log(dropResult.num + " is set to " + phrase);
          dispatch(setEnteredSrp(newSrp));
          dispatch(setShuffledSrpIndex(shuffledSrpIndex+1));
          setPhrase(shuffledSrp[shuffledSrpIndex]);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [phrase]
  );

  return (
    <div ref={dragRef} className={styles.parent}>
      <div className={styles.badge}>
        <div className={styles.phrase}>{phrase}</div>
      </div>
    </div>
  );
};
export default SRPDragBadge;
