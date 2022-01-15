import { Window, ChannelHeader, MessageList, MessageInput, Thread } from "stream-chat-react";
import react from "react";


const MessagingContainer = () => {
    return(
        <div className="messaging-container">
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
        </div>
    )
}
export default MessagingContainer;