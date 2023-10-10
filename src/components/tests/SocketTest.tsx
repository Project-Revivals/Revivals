import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./../../types/socketModels";

// websocketを試しに使ってみるためのコンポーネント
export default function SocketTest(){
    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
            // サーバーのURLを指定
            "http://localhost:3000"
        );

        socket.on("connect", () => {
            console.log(socket.connected);
        });

        socket.on("hello", (message) => {
            console.log(message);
        });

        socket.emit("message", "hello world");
    }, []);

    return (
        <div>

        </div>
    )
};