import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./App.css";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("7be8cd2b6520eb3fad33", {
      cluster: "ap2",
    });
    console.log(messages);
    // var channel = pusher.subscribe("messages");
    // channel.bind("inserted", function (data) {
    //   alert(JSON.stringify(data));
    // });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
