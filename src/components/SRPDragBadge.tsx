import { SRPBadgeProps } from "@/src/components/SRPBadgeProps";
import styles from "@/src/components/SRPBadge.module.scss";

const SRPDragBadge = (_: SRPBadgeProps) => {
  // Get shuffled SRP
  return (
    <div className={styles.parent}>
      <div className={styles.badge}>
        <div className={styles.phrase}> </div>
      </div>
    </div>
  );
};
export default SRPDragBadge;
