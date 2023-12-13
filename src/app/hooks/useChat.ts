"use client";
import { useCallback, useEffect, useState } from "react";
import { ChatModel, MessageModel, SendMessageModel } from "../models/chat";
import { UserProfile } from "@auth0/nextjs-auth0/client";

const address = `${process.env.NEXT_PUBLIC_API_URL}/messages`;

export function useChat(user: UserProfile | null) {
    const [chat, setChat] = useState<ChatModel | null>(null);

    useEffect(() => {
        const apiCall = async () => {
            const response = await fetch(`api/chat`)

            if (response.status !== 200) {
                setChat(null)
                return;
            }

            const messages = await response.json() as MessageModel[];
            setChat({ messages: messages } as ChatModel);
        }

        apiCall()
    }, []);

    const sendMessage = useCallback(async (text: string) => {
        if (user === undefined)
            return;

        const createMessageModel = {
            // TODO: unhardcode this shit
            chatId: 1,
            sender: user?.name,
            text: text,
        } as SendMessageModel;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createMessageModel)
        };
        const response = await fetch(`${address}`, requestOptions).then(
            (json) => json,
            (reason) => null
        );
        const createdMessage = await response?.json() as MessageModel;

        setChat((chat) => {
            if (chat?.messages.some((m) => m.messageId == createdMessage.messageId))
                return chat;
            return {
                ...chat, messages: [...chat!.messages!, createdMessage]
            }
        })
    }, [user]);

    return { chat, setChat, sendMessage }
}