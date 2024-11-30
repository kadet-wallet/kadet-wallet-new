import SRPTextInputBadge from "@/src/components/SRPTextInputBadge";
import { SRPLayoutProps } from "@/src/components/SRPLayoutProps";

const SRPLayoutImport = (props: SRPLayoutProps) => {
  return (
    <>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + i;
            return <SRPTextInputBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 3 + i;
            return <SRPTextInputBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 6 + i;
            return <SRPTextInputBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 9 + i;
            return <SRPTextInputBadge num={idx} />;
          })}
      </div>
    </>
  );
};

export default SRPLayoutImport;
