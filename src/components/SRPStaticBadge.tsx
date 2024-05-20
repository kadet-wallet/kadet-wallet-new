import styles from "@/src/components/SRPBadge.module.scss";
import { SRPBadgeProps } from "@/src/components/SRPBadgeProps";
import { useSelector } from "react-redux";
import { RootState } from "@/src/Redux/store";
const SRPStaticBadge = (props: SRPBadgeProps) => {
  const correctSrp = useSelector(
    (state: RootState) => state.srpState.correctSrp
  );

  return (
    <div className={styles.parent}>
      <div className={styles.badge}>
        <div>{props.num + 1}: </div>
        <div className={styles.phrase}> {correctSrp[props.num]}</div>
      </div>
    </div>
  );
};

export default SRPStaticBadge;
