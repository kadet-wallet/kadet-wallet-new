// import * as react from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPDragBadge from "@/src/components/SRPDragBadge";
import SRPLayoutDrop from "@/src/components/SRPLayoutDrop";
import Button from "@/src/components/Button";
import Filler from "@/src/components/Filler";
import { resetSrp } from "@/src/utils/ResetSrp";

const SRPTest = () => {
  return (
    <DndProvider backend={HTML5Backend} debugMode={true}>
      <DefaultLayout>
        <div>
          <SRPDragBadge />
        </div>
        <SRPLayoutDrop startIdx={0} />
        <Filler flexGrow={1} />
        <Link to="/SRPTest2">
          <div>
            <Button active={true}>Next Words</Button>
          </div>
        </Link>
        <div>
          <Button active={true} onClick={resetSrp}>
            Reset
          </Button>
        </div>
      </DefaultLayout>
    </DndProvider>
  );
};

export default SRPTest;
