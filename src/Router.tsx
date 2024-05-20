import { HashRouter, Route, Routes } from "react-router-dom";
import StartScreen from "@/src/pages/StartScreen";
import Unlock from "@/src/pages/Unlock";
import CreatePassword from "@/src/pages/CreatePassword";
import SRPIntro from "@/src/pages/SRPIntro";
import SRPDisplay from "@/src/pages/SRPDisplay";
import SRPTest from "@/src/pages/SRPTest";
import SRPTestSuccess from "@/src/pages/SRPTestSuccess";
import Dashboard from "@/src/pages/Dashboard";
import KDATransferInput from "@/src/pages/KDATransferInput";
import KDATransferInProgress from "@/src/pages/KDATransferInProgress";
import ImportWallet from "@/src/pages/ImportWallet";

const Routers = () => {
  console.log("Router");
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartScreen />}></Route>
        <Route path="/Unlock" element={<Unlock />}></Route>
        <Route
          path="/CreatePasswordForSrpCreation"
          element={<CreatePassword nextScreen="/SrpIntro" />}
        ></Route>
        <Route
          path="/CreatePasswordForWalletImport"
          element={<CreatePassword nextScreen="/ImportWallet" />}
        ></Route>
        <Route path="/SRPIntro" element={<SRPIntro />}></Route>
        <Route path="/SRPDisplay" element={<SRPDisplay />}></Route>
        <Route path="/SRPTest" element={<SRPTest />}></Route>
        <Route path="/SRPTestSuccess" element={<SRPTestSuccess />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/KDATransferInput" element={<KDATransferInput />}></Route>
        <Route
          path="/KDATransferInProgress"
          element={<KDATransferInProgress />}
        ></Route>
        <Route path="/ImportWallet" element={<ImportWallet />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Routers;
