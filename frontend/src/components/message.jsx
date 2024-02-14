import { useChat } from "../hooks/useProvider";

const Message = ({message}) => {
   const senderId = useChat().senderId
   const receiverId = useChat().receiverId


   return (
      <div className={`flex w-full ${ message.senderId === senderId ? 'justify-start text-left' : 'justify-end text-right'}`}>
         <div className={`w-fit max-w-[80%] flex-col rounded-xl mx-2 mt-1 ${ message.senderId === senderId ? 'bg-[#ffffff]' : 'bg-[#d9fdd3]'}`}>
            <p className='m-0 text-black py-px px-2 text-justify'> { message.senderId && message.content } </p>
         </div>
      </div>
   );
}

export default Message 