import SRPDropBadge from "@/src/components/SRPDropBadge";
import { SRPLayoutProps } from "@/src/components/SRPLayoutProps";

const SRPLayoutDrop = (props: SRPLayoutProps)=> {
  
  return (
    <>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + i;
            return <SRPDropBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 3 + i;
            return <SRPDropBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 6 + i;
            return <SRPDropBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 9 + i;
            return <SRPDropBadge num={idx} />;
          })}
      </div>
    </>
  );
};

export default SRPLayoutDrop;
