import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {

    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : "black";
    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div>
            <div className={`chat ${chatClassName}`}>
                <div className="chat-image avatar ">
                    <div className="w-10 rounded-full">
                        <img src={profilePic} alt="avatar" className="" />
                    </div>
                </div>
                <div className={`text-white chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
                <div className="flex items-center gap-1 text-xs opacity-50 chat-footer">{formattedTime}</div>
            </div>

        </div>
    )
}

export default Message
