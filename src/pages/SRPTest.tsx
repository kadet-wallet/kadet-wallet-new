// import * as react from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPDragBadge from "@/src/components/SRPDragBadge";
import SRPLayoutDrop from "@/src/components/SRPLayoutDrop";
import Button from "@/src/components/Button";


const SRPTest = () => {
  return (
  <DefaultLayout>
    <DndProvider backend={HTML5Backend} debugMode={true}>
      <div>
        <SRPDragBadge />
      </div>
     <SRPLayoutDrop startIdx={0} />
     <Link to="/SRPTest2">
        <Button active={true}>Next Words</Button>
     </Link>
    </DndProvider>
  </DefaultLayout>
  );
};

export default SRPTest;
