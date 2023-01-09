import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { RosbridgeContext } from "../RosbridgeProvider";
var ROSLIB = require("roslib");

interface Props {
  children: React.ReactNode;
}

export type MessageHistoryContextType = {
  message: string;
};

export const MessageHistoryContext =
  React.createContext<MessageHistoryContextType>({
    message: "",
  });

export const MessageHistoryProvider: FC<Props> = ({ children }) => {
  const { message } = useContext(RosbridgeContext);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [messageIndexSelected, setMessageIndexSelected] = useState<number>(-1);
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [stopRecord, setStopRecord] = useState<boolean>(false);

  const handleChange = useCallback(() => {
    setStopRecord(!stopRecord);
  }, [stopRecord]);

  useEffect(() => {
    if (!stopRecord) setMessageHistory([...messageHistory, message]);
  }, [message, setMessageHistory]);

  useEffect(() => {
    if (messageIndexSelected < 0 && messageHistory.length > 0) {
      const messageToSelect = messageHistory[messageHistory.length - 1];
      setSelectedMessage(messageToSelect);
      return;
    }

    if (messageIndexSelected > 0 && messageHistory.length > 0) {
      const messageToSelect = messageHistory[messageIndexSelected];
      if (messageToSelect) setSelectedMessage(messageToSelect);
      return;
    }
  }, [messageHistory, messageIndexSelected]);

  const messageHistoryContext: MessageHistoryContextType = {
    message: selectedMessage,
  };

  return (
    <MessageHistoryContext.Provider value={messageHistoryContext}>
      <>
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            backgroundColor: stopRecord ? "red" : "green",
            zIndex: "1000",
          }}
        >
          Current Message:{" "}
          {messageIndexSelected < 0 ||
          messageIndexSelected === messageHistory.length - 1
            ? "Latest"
            : messageIndexSelected + 1}
          <div>Total: {messageHistory.length}</div>
          <div>
            <Button
              onClick={() => {
                console.log("First");
                if (messageHistory.length === 0) return;
                setMessageIndexSelected(0);
              }}
              variant="contained"
            >
              First
            </Button>
            <Button
              onClick={() => {
                console.log("Previous");
                if (messageHistory.length === 0) return;
                if (messageIndexSelected === 0) return;
                if (messageIndexSelected === -1) {
                  const index = messageHistory.length - 2;
                  setMessageIndexSelected(index);
                  return;
                }
                setMessageIndexSelected(messageIndexSelected - 1);
              }}
              variant="contained"
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                console.log("Next");
                if (
                  messageHistory.length === 0 ||
                  messageIndexSelected === messageHistory.length - 1
                )
                  return;
                setMessageIndexSelected(messageIndexSelected + 1);
              }}
              variant="contained"
            >
              Next
            </Button>
            <Button
              onClick={() => {
                console.log("Live");
                if (messageHistory.length === 0) return;
                setMessageIndexSelected(-1);
              }}
              variant="contained"
            >
              Last
            </Button>
            <Button
              onClick={() => {
                console.log("Erase");
                setMessageIndexSelected(-1);
                setMessageHistory([]);
                setSelectedMessage("");
              }}
              variant="contained"
            >
              Erase
            </Button>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stopRecord}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Pause Record"
              />
            </FormGroup>
          </div>
        </div>
        {children}
      </>
    </MessageHistoryContext.Provider>
  );
};
