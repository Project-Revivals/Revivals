import React from "react";
import { createContext, ReactNode, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from './../config/default';
import { ClientToServerEvents, ServerToClientEvents } from "./../types/socketModels";

/* socket.io定義 */
//SOCKET_URLの中身のところに接続を要求
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);


/* Provider定義 */
type Context = {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
};

const SocketContext = createContext<Context>({
    socket
});

// socketを管理するprovider
export default function SocketProvider({children}: {children: ReactNode}){
    return (
        <SocketContext.Provider
            value={{
                socket
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

// useContextもいちいちSocketContextを渡すのが面倒なのでexportしておく
export const useSockets = () => useContext(SocketContext);