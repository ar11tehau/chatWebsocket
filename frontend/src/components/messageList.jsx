const MessageList = ({ children }) => {
   return (
      <div className='w-full flex flex-col-reverse grow overflow-auto'> 
         { children } 
      </div>
   );
}


export default MessageList 