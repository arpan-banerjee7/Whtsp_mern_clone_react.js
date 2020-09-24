import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './App.css'
import Pusher from 'pusher-js'
import axios from "./axios"


function App() {
  const [messages, setMessages] =  useState([]);

  useEffect(() => {
   
    axios.get('/messages/sync')
      .then((response)=>{
        setMessages(response.data);
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('213c701d4f851b7e4bed', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      
      setMessages([...messages,newMessage ]);
    });
    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]); 
    
  console.log(messages);
    return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
          
      </div>
         
          
    </div>
  );
}

export default App;
