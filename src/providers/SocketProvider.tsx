import React, { createContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from './../config/default';
import { ClientToServerEvents, ServerToClientEvents } from "./../types/socketModels";


type Context = {
    socket: Socket,
    setUsername: Function
    messages?: {message: string, username: string, time: string}[],
    setMessages: Function
};

//SOCKET_URLの中身のところに接続を要求
const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
    socket, 
    setUsername: () => false ,
    setMessages: () => false
});

export default function SocketProvider({children}: {children: ReactNode}){
    return (
        <SocketContext.Provider
            value={{}}
        >
            {children}
        </SocketContext.Provider>
    )
};