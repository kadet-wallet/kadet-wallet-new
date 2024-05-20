import { SRPBadgeProps } from "@/src/components/SRPBadgeProps";
import styles from "@/src/components/SRPBadge.module.scss";

const SRPDropBadge = (props: SRPBadgeProps) => {
  // Get shuffled SRP
  return (
    <div className={styles.parent}>
      <div className={styles.badge}>
        <div>{props.num}: </div>
        <div className={styles.phrase}> </div>
      </div>
    </div>
  );
};
export default SRPDropBadge;
