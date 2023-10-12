import React, { useState, useEffect } from "react";
import { useSockets } from "../../providers/SocketProvider";

// websocketを試しに使ってみるためのコンポーネント
export default function SocketTest(){
    const {
        socketRef,
        messages,
        addMessage
    } = useSockets();

    const [text, setText] = useState<string>("");

    // 他ユーザーにmessageを送信する関数
    function sendMessage(message: string): void{
        const socketInstance = socketRef.current;
        if(!socketInstance) return;
        socketInstance.emit("sendMessage", message); // 他ユーザーに送信
        addMessage(message); // 自分の画面に追加
    }

    // input要素のvalueを、他ユーザーにmessageとして送信する関数
    function handleSendButton(): void{
        sendMessage(text);
        setText(""); // ボタンがクリックされたらテキストをクリア
    }

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(event) => {
                    const newText: string = event.target.value;
                    setText(newText);
                }}
            />
            <button
                onClick={handleSendButton}
            >
                送信
            </button>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <span>{message}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};