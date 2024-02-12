import React, { createContext, useContext, useState, useEffect } from "react";
import socket from "../socket";
import { messages } from "../components/messages";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
   const [userName, setUserName] = useState(false);
   const [contactName, setContactName] = useState(false);
   const [listContacts, setListContacts] = useState(["Arii", "Bob"]);
   const [contactImgUrl, setContactImg] = useState("/src/assets/Arii.jpeg");
   const [listMessage, setlistMessage] = useState(messages);

   socket.on("user_created", (newUser) => {
      console.log("user creation :", newUser);
   });

   const sendMsg = (msg) => {
      socket.emit("newmsg", msg);
   };

   const sendMessage = (newMessageText) => {
      const newMessage = {
         id: listMessage.length + 1,
         message: newMessageText,
         isSent: true,
      };
      setlistMessage([...listMessage, newMessage]);
      sendMsg(newMessageText);
   };

   return (
      <ChatContext.Provider
         value={{
            userName,
            contactName,
            listContacts,
            listMessage,
            contactImgUrl,
            sendMessage,
            setUserName,
            setContactName,
            setListContacts,
            setContactImg,
         }}
      >
         {children}
      </ChatContext.Provider>
   );
};

export const useChat = () => useContext(ChatContext);
