import { useEffect, useRef, useState } from "react";
import socket from "./socket"

import "./App.css";

import Talk from "./components/talk"
import Body from "./components/body"
import Login from "./components/login";
import ContactList from "./components/contactList"

function App() {
   const [userName, setUserName] = useState(false)
   const [contactName, setContactName] = useState(false)
   const [listContacts, setListContacts] = useState(["Arii", "Bob"])
   const [contactImgUrl, setContactImg] = useState("/src/assets/Arii.jpeg") 
   
   
   socket.emit("message", 'WebSocket connection established');

   socket.on("user_created", (newUser) => {
      console.log("user created :", newUser)
   })
   
   const sendMsg = (msg) => {
      socket.emit("newmsg", msg);
   };
   

   return (
      <Body userName={ userName } className="text-blue-500 w-full">
         { !userName && !contactName ? (
            <Login setUserName={ setUserName }/>
         ) : (
            userName && !contactName ? (
               <ContactList listContacts={ listContacts } setContactName={ setContactName } />
            ) : (
               <Talk setUserName={ setUserName } setContactName={ setContactName } contactName={ contactName } contactImgUrl={ contactImgUrl } sendMsg={ sendMsg }/>
            )
         )}
         
      </Body>
   );
}

export default App;
