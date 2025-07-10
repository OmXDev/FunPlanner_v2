import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessgeInput";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import { formatMessageTime } from "../../lib/utils";

import {
  getMessages,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../../redux/slices/chatSlice";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, selectedUser } = useSelector((state) => state.chat);
  const { authUser , isCheckingAuth } = useSelector((state) => state.auth);
  const messageEndRef = useRef(null);
  

  if (isCheckingAuth || !authUser) return null;

  useEffect(() => {
    if (!selectedUser?._id) return;

    dispatch(getMessages(selectedUser._id));
    dispatch(subscribeToMessages());

    return () => {
      dispatch(unsubscribeFromMessages());
    };
  }, [dispatch, selectedUser?._id]);

  if (isCheckingAuth) return <div>Checking authentication...</div>;
  if (!authUser) return <div>Please log in to use chat.</div>;


  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading || !selectedUser) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-[#161b22] text-white">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#161b22] text-white border-l border-slate-700">
      {/* Header */}
      <ChatHeader />

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              ref={messageEndRef}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[75%] flex gap-3 items-end">
                {!isSender && (
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="w-9 h-9 rounded-full border border-slate-700"
                  />
                )}

                <div className="flex flex-col gap-1">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="rounded-lg max-w-xs border border-slate-700"
                    />
                  )}
                  {message.text && (
                    <div
                      className={`px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                        isSender
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-100"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}
                  <span className="text-xs text-slate-500 mt-1">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>

                {isSender && (
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="w-9 h-9 rounded-full border border-slate-700"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-slate-700">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
