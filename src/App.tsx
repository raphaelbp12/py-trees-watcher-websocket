import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import Home from "./pages/home";
import { MessageHistoryProvider } from "./providers/MessageHistoryProvider";
import { RosbridgeProvider } from "./providers/RosbridgeProvider";

function App() {
  return (
    <RosbridgeProvider>
      <MessageHistoryProvider>
        <div className="App">
          <Home />
        </div>
      </MessageHistoryProvider>
    </RosbridgeProvider>
  );
}

export default App;
