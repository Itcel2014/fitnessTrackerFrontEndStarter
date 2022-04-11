import { useState, } from "react";
import { sendMessage } from "../api/ajaxHelpers";
import React from "react";

// The below form is referenced inside the Profile section and displays the reply form for each message
const Messages = ({token, message}) => {
  const [reply, setReply] = useState("");
  const [replySent, setReplySent] = useState(false);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(reply, message.post._id, token);
          setReplySent(true);
        }}
      >
        <input className="message-input"
          placeholder="Reply"
          type="text"
          value={reply}
          onChange={(e) => {
            setReply(e.target.value);
          }}
        />
        <button type="submit">Reply</button>
      </form>

      <div>{replySent ? "Reply Sent!" : null}</div>
    </div>
  );
};

export default Messages;
