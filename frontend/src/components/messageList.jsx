const MessageList = ({ children }) => {
   return (
      <div className='w-full flex flex-col-reverse overflow-auto'> 
         { children } 
      </div>
   );
}


export default MessageList 