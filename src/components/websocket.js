import React from "react";
import WebSocket from "react-websocket";
import axios from 'axios';
import { useAlert } from 'react-alert'

const WEBSOCKET_URL = 'ws://localhost:9191/events';
// const REQUEST_INSERT = Symbol('INTERNAL.REQUEST_INSERT');



const WebSocketManager = () => {

    const alert = useAlert()
    const onMessage = React.useCallback((badgeID) => {
    console.log(badgeID)
    axios.get("https://kraken.picasso-dev.fr/api/core/badge_scan?badge_id=" + badgeID)
        .then(res => {
            const info = res.data;
            console.log(info)
            alert.show('Bienvenue '+ info["first_name"] + " " + info["last_name"])
      })
      .catch(err=>{
          console.log(err)
          alert.show("Erreur, repasse ton badge stp")
        })

  });

  return (

    <WebSocket
      url = { WEBSOCKET_URL }
      onOpen={() => console.log("connected")}
      onClose={() => console.log("disconnected")}
      onMessage={(data) => onMessage(data.substr(13, data.length))}
      reconnectIntervalInMilliSeconds = { 500 }
    />

  )

}

export default WebSocketManager;
