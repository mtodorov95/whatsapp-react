import React, { useEffect } from "react";
import Pusher from "pusher-js";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

function App() {
  useEffect(() => {
    const pusher = new Pusher("79443249bbc2e31b144d", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      alert(JSON.stringify(data));
    });
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
