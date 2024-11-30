import SRPStaticBadge from "@/src/components/SRPStaticBadge";
import { SRPLayoutProps } from "@/src/components/SRPLayoutProps";

const SRPLayoutStatic = (props: SRPLayoutProps)=> {
  
  return (
    <>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + i;
            return <SRPStaticBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 3 + i;
            return <SRPStaticBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 6 + i;
            return <SRPStaticBadge num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = props.startIdx + 9 + i;
            return <SRPStaticBadge num={idx} />;
          })}
      </div>
    </>
  );
};

export default SRPLayoutStatic;