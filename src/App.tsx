import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import Home from "./pages/home";
import { RosbridgeProvider } from "./providers/RosBridge";

function App() {
  return (
    <RosbridgeProvider>
      <div className="App">
        <Home />
      </div>
    </RosbridgeProvider>
  );
}

export default App;
