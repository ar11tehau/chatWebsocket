import SenderInfo from "./senderinfo";
import Input from "./input";
import MessageList from "./messageList";
import Message from "./message";

import Logout from "./logout"
import Return from "./return"
import Header from "./header"
import Footer from "./footer"
import { useChat } from "../hooks/useProvider";

const Talk = () => {
   const listMessage = useChat().listMessage
   const userName = useChat().userName
   const contactName = useChat().contactName
   const sendMessage = useChat().sendMessage
   const getUserDb = useChat().getUserDb
   const getMessages = useChat().getMessages

   if (userName && contactName) {
      getUserDb(userName, contactName) ? getMessages() : null
      return (
         <>
            <Header>
               <SenderInfo />
               <div className="flex space-x-3">
                  <Return />
                  <Logout />
               </div>
            </Header>
            <MessageList>
               {listMessage.reverse().map((mymessage, id) => (
                  <Message key={id} message={mymessage} />
               ))}
            </MessageList>
            <Footer>
               <Input sendText={ sendMessage } placeHolder="Messages" />
            </Footer>
         </>
      );
   } else {
      return (null)
   }
}


export default Talk 