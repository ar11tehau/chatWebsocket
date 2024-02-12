import React, { createContext, useContext, useState, useEffect } from "react";
import { chatAPI } from "../chatAPI";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
   const [userName, setUserName] = useState(false)
   const [contactName, setContactName] = useState(false)
   const [listContacts, setListContacts] = useState(["Arii", "Bob"])
   const [contactImgUrl, setContactImg] = useState("/src/assets/Arii.jpeg") 
   
   
   socket.on("user_created", (newUser) => {
      console.log("user creation :", newUser)
   })
   
   const sendMsg = (msg) => {
      socket.emit("newmsg", msg);
   };

   return (
      <ChatContext.Provider
         value={{ messages, sendMessage, clearMessages, switchRoom }}
      >
         {children}
      </ChatContext.Provider>
   );
};

export const useChat = () => useContext(ChatContext);
