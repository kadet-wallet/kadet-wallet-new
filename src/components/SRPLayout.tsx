import { type ElementType, type ComponentPropsWithoutRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSrpIndex } from "@/src/Redux/SrpStateSlice";
import { RootState } from "@/src/Redux/store";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

type SRPLayoutProps<T extends ElementType> = {
  as: ElementType;
} & ComponentPropsWithoutRef<T>;

const SRPLayout = <C extends ElementType>({
  as: Component,
}: SRPLayoutProps<C>) => {
  const dispatch = useDispatch();
  const startIdx = useSelector((state: RootState) => state.srpState.srpIndex);
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
          <ImArrowRight2 onClick={() => dispatch(setSrpIndex(12))} />
        ) : (
          <ImArrowLeft2 onClick={() => dispatch(setSrpIndex(0))} />
        )}
      </div>
    </>
  );
};

export default SRPLayout;
