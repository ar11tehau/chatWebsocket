import { createContext, useContext, useState } from "react";
import socket from "/src/socket"

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
   const [userName, setUserName] = useState(false);
   const [contactName, setContactName] = useState(false);
   
   const [senderId, setSenderId] = useState(false);
   const [receiverId, setReceiverId] = useState(false);

   const [connectedUsers, setConnectedUsers] = useState([]);
   const [disconnectedUsers, setDisconnectedUsers] = useState([]);

   const [contactImgUrl, setContactImg] = useState("/src/assets/Arii.jpeg");
   const [listMessage, setlistMessage] = useState([]);

   const capitalize = (str) => {
      if (typeof str !== 'string' || str.length === 0) {
        return str;
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
   

   const getConnectedUsers = () => {
      socket.on("connected", ([connectedUsersRaw, usersRaw]) => {
         const connectedUsersServer = connectedUsersRaw
            .filter((item) => item !== userName);
         const usersServer = usersRaw
            .filter((item) => !connectedUsersRaw.includes(item));
   
         setConnectedUsers(connectedUsersServer);
         setDisconnectedUsers(usersServer);
      });
   }

   const connectUser = (userName) => {
      socket.emit("userConnection", userName);
   };

   const disconnectUser = () => {
      socket.emit("logout");
   };
   
   const getUserDb = () => {
      socket.emit("userdb", [userName, contactName])
      socket.on("userdb", ([senderId, receiverId]) => {
         setSenderId(senderId)
         setReceiverId(receiverId)
      })
      getMessages()
      return true
   }
   
   // socket.on("messages", (response) => {
   //    const messages = response.map((message) => console.log(message))
   //    setlistMessage([])
   // })

   const getMessages = () => {
      socket.emit("getmessages", ([senderId, receiverId]))
      socket.on("getmessages", (messages) => {
         setlistMessage(messages)
      })
   }

   const sendMessage = (newMessageText) => {
      socket.emit("newmessage", [newMessageText, senderId, receiverId]);
   };



   

   

   return (
      <ChatContext.Provider
         value={{
            userName,
            contactName,
            listMessage,
            contactImgUrl,
            connectedUsers,
            disconnectedUsers,
            senderId,
            receiverId,
            sendMessage,
            setUserName,
            setContactName,
            setContactImg,
            connectUser,
            disconnectUser,
            getConnectedUsers,
            getUserDb,
            getMessages,
            capitalize,
         }}
      >
         {children}
      </ChatContext.Provider>
   );
};

export const useChat = () => useContext(ChatContext);
