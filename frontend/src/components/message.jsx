const Message = ({message}) => {
   return (
      <div className={`flex w-full ${message.isSent ? 'justify-start text-left' : 'justify-end text-right'}`}>
         <div className={`w-fit max-w-[80%] flex-col rounded-xl mx-2 mt-1 ${message.isSent ? 'bg-[#ffffff]' : 'bg-[#d9fdd3]'}`}>
            <p className='m-0 text-black py-px px-2 text-justify'> { message.message } </p>
         </div>
      </div>
   );
}

export default Message 