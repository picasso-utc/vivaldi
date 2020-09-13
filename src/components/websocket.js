import React from "react";
import WebSocket from "react-websocket";

const WEBSOCKET_URL = 'ws://localhost:9191/events'
const REQUEST_INSERT = Symbol('INTERNAL.REQUEST_INSERT');



const WebSocketManager = () => {


  const onMessage = React.useCallback((badgeID) => {
    console.log(badgeID)

  });

  return (
    <WebSocket
      url = { WEBSOCKET_URL }
      onOpen={() => console.log("connected")}
      onClose={() => console.log("disconnected")}
      onMessage={(data) => onMessage(data.substr(13, data.length))}
      />
  )
}

export default WebSocketManager;
