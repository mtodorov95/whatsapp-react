import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  // Get all messages on load
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  // Get new message on change
  useEffect(() => {
    const pusher = new Pusher("79443249bbc2e31b144d", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

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
