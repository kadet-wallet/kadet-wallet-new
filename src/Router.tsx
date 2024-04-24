import { HashRouter, Route, Routes } from "react-router-dom";
import StartScreen from "@/src/pages/StartingScreen";
import Login from "@/src/pages/Login";
import CreatePassword from "@/src/pages/CreatePassword";
import SrpIntro from "@/src/pages/SrpIntro";
import Srp from "@/src/pages/SRP";
import SrpTest from "@/src/pages/SRPTest";
import SrpTestSuccess from "@/src/pages/SRPTestSuccess";
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
        <Route path="/Login" element={<Login />}></Route>
        <Route
          path="/CreatePasswordForSrpCreation"
          element={<CreatePassword nextScreen="/SrpIntro" />}
        ></Route>
        <Route
          path="/CreatePasswordForWalletImport"
          element={<CreatePassword nextScreen="/ImportWallet" />}
        ></Route>
        <Route path="/SrpIntro" element={<SrpIntro />}></Route>
        <Route path="/Srp" element={<Srp />}></Route>
        <Route path="/SrpTest" element={<SrpTest />}></Route>
        <Route path="/SrpTestSuccess" element={<SrpTestSuccess />}></Route>
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
