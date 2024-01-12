import React from "react";
import { useState } from "react";
import "./style/App.css";
const App = () => {
  const [Message, SetMessage] = useState("");
  const send = () => {
    let sendDiv = document.createElement("div");
    const messageArea = document.getElementById("messageArea");
    sendDiv.innerHTML = Message;
    sendDiv.classList.add("send");
    messageArea.appendChild(sendDiv);
    scrollToBottom();
    result();
  };
  const result = async () => {
    let reciveDiv = document.createElement("div");
    const messageArea = document.getElementById("messageArea");
    const url = "https://open-ai21.p.rapidapi.com/conversationgpt35";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "a9e8bc628emsh9e05d7a06490db9p14d146jsnf3a5189d0076",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: Message,
          },
        ],
        web_access: false,
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
      }),
    };    
    SetMessage("");
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const ans = JSON.parse(result);
      reciveDiv.innerHTML = ans.result;
      reciveDiv.classList.add("recive");
      messageArea.appendChild(reciveDiv);
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };
  function scrollToBottom() {
    const messageArea = document.getElementById("messageArea");
    messageArea.scrollTop = messageArea.scrollHeight;
  }
  return (
    <>
    <div className="Main">
      <iframe src="https://lottie.host/embed/315bc849-d392-4583-babd-4a01d0e945c7/oC6OJWb7xz.json"></iframe>
      <div className="Maincont">
        <div id="messageArea">
          <div className="recive">Hello, fellow explorer of AI! 🤖 Arpit's creation is ready to navigate the vast realm of conversation. What's our destination?</div>
        </div>
        <div className="controler">
          <input
            type="text"
            value={Message}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                send(); 
              }
            }}
            onChange={(e) => {
              SetMessage(e.target.value);
            }}
            placeholder="Enter the message"
          />
          <button onClick={send}>Send</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
