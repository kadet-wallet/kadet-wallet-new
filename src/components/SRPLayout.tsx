import { type ElementType, type ComponentPropsWithoutRef } from "react";
import * as react from "react";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

type SRPLayoutProps<T extends ElementType> = {
  as: ElementType;
} & ComponentPropsWithoutRef<T>;

const SRPLayout = <C extends ElementType>({
  as: Component,
}: SRPLayoutProps<C>) => {
  const [startIdx, setStartIdx] = react.useState(0);

  return (
    <>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = startIdx + i;
            return <Component num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = startIdx + 3 + i;
            return <Component num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = startIdx + 6 + i;
            return <Component num={idx} />;
          })}
      </div>
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const idx = startIdx + 9 + i;
            return <Component num={idx} />;
          })}
      </div>
      <div>
        {startIdx == 0 ? (
          <ImArrowRight2 onClick={() => setStartIdx(12)} />
        ) : (
          <ImArrowLeft2 onClick={() => setStartIdx(0)} />
        )}
      </div>
    </>
  );
};

export default SRPLayout;
