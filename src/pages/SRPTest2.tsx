// import * as react from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPDragBadge from "@/src/components/SRPDragBadge";
import SRPLayoutDrop from "@/src/components/SRPLayoutDrop";
import Filler from "@/src/components/Filler";
import Button from "@/src/components/Button";

const SRPTest2 = () => {
return (
    <DndProvider backend={HTML5Backend} debugMode={true}>
        <DefaultLayout>
            <div>
                <SRPDragBadge />
            </div>
            <SRPLayoutDrop startIdx={12} />
            <Filler flexGrow={1} />
            <Link to="/SRPTestSuccess">
                <div>
                    <Button active={true}>Next</Button>
                </div>
            </Link>
        </DefaultLayout>
    </DndProvider>
  );
};

export default SRPTest2;