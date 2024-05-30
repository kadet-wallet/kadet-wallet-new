// import * as react from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPDropBadge from "@/src/components/SRPDropBadge";
import SRPLayout from "@/src/components/SRPLayout";
import SRPDragBadge from "@/src/components/SRPDragBadge";

const SRPTest = () => {
  //   const [startIdx, setStartIdx] = react.useState(0);
  //   // TODO: range(0-11 or 12-23).map(() => displayTextInput(words[i]))
  return (
    <DndProvider backend={HTML5Backend}>
      <DefaultLayout>
        <div>
          <SRPDragBadge num={0} />
        </div>
        <SRPLayout as={SRPDropBadge} />
      </DefaultLayout>
    </DndProvider>
  );
};

export default SRPTest;
