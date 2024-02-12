import SenderInfo from "./senderinfo";
import Input from "./input";
import MessageList from "./messageList";
import Message from "./message";

import Logout from "./logout"
import Header from "./header"
import Footer from "./footer"
import { messages } from "./messages";

import { useState } from "react";



const Talk = ( { setUserName, setContactName, contactName, contactImgUrl, sendMsg } ) => {
   const [listMessage, setlistMessage] = useState(messages);

   const sendMessage = (newMessageText) => {
      const newMessage = {
         id: listMessage.length + 1,
         message: newMessageText,
         isSent: true,
      }
      setlistMessage([...listMessage, newMessage]);
      sendMsg(newMessageText)
   
   };

   return (
      <>
         <Header>
            <SenderInfo contactImgUrl={ contactImgUrl } contactName={ contactName } />
            <Logout setUserName={ setUserName } setContactName={ setContactName } />
         </Header>
         <MessageList>
            {listMessage.map((mymessage, id) => (
               <Message key={id} message={mymessage} />
            ))}
         </MessageList>
         <Footer>
            <Input sendText={sendMessage}  placeHolder="Message" />
         </Footer>
      </>
   );
}


export default Talk 