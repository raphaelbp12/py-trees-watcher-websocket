import React, { FC, useCallback, useEffect, useState } from "react";
var ROSLIB = require("roslib");

interface Props {
  children: React.ReactNode;
}

export type RosbridgeContextType = {
  message: string;
};

export const RosbridgeContext = React.createContext<RosbridgeContextType>({
  message: "",
});

export const RosbridgeProvider: FC<Props> = ({ children }) => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: "ws://172.22.10.66:9090",
    });

    ros.on("connection", function () {
      console.log("Connected to websocket server.");
    });

    ros.on("error", function (error: any) {
      console.log("Error connecting to websocket server: ", error);
    });

    ros.on("close", function () {
      console.log("Connection to websocket server closed.");
    });
    var listener = new ROSLIB.Topic({
      ros: ros,
      name: "/tree_js_parsed_data",
      messageType: "std_msgs/String",
    });

    listener.subscribe((message: any) => {
      setMessage(message.data);
    });
  }, []);

  const rosbridgeContext: RosbridgeContextType = {
    message: message,
  };

  return (
    <RosbridgeContext.Provider value={rosbridgeContext}>
      {children}
    </RosbridgeContext.Provider>
  );
};
