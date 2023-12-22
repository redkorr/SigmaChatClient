"use client";
import { useCallback, useEffect, useState } from "react";
import { ChatModel, MessageModel, SendMessageModel } from "../models/chat";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { UserModel } from "../models/user";

export function useChat(user: UserModel | null) {
    const [chat, setChat] = useState<ChatModel | null>(null);
    const [errors, setErrors] = useState<string>();

    useEffect(() => {
        if (!user)
            return;

        const apiCall = async () => {
            const response = await fetch(`api/chat`)

            if (response.status !== 200) {
                setErrors(response.status + " - " + response.text);
                return;
            }

            const messages = await response.json() as MessageModel[];
            setChat({ messages: messages } as ChatModel);
        }

        apiCall()
    }, [user]);

    const sendMessage = useCallback(async (text: string) => {
        if (!user)
            return;

        const createMessageModel = {
            // TODO: unhardcode this shit
            chatId: 1,
            sender: user.id,
            text: text,
        } as SendMessageModel;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createMessageModel)
        };
        const response = await fetch(`api/chat`, requestOptions)
        if (response.status != 200) {
            setErrors(response.status + " - " + response.text);
            return;
        }

        const createdMessage = await response.json() as MessageModel;

        setChat((chat) => {
            if (chat?.messages.some((m) => m.messageId == createdMessage.messageId))
                return chat;
            return {
                ...chat, messages: [...chat!.messages!, createdMessage]
            }
        })
    }, [user]);

    return { chat, setChat, sendMessage, errors }
}