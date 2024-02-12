import SenderInfo from "./senderinfo";
import Input from "./input";
import MessageList from "./messageList";
import Message from "./message";

import Logout from "./logout"
import Header from "./header"
import Footer from "./footer"
import { useChat } from "../hooks/useProvider";

const Talk = () => {
   const listMessage = useChat().listMessage
   const userName = useChat().userName
   const contactName = useChat().contactName

   if (userName && contactName){
      return (
         <>
            <Header>
               <SenderInfo />
               <Logout />
            </Header>
            <MessageList>
               {listMessage.map((mymessage, id) => (
                  <Message key={id} message={mymessage} />
               ))}
            </MessageList>
            <Footer>
               <Input />
            </Footer>
         </>
      );
   } else {
      return (null)
   }
}


export default Talk 