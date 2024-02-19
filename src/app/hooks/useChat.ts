'use client';
import { useCallback, useEffect, useState } from 'react';
import { ChatModel, MessageModel, SendMessageModel } from '../models/chat';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { UserModel } from '../models/user';

export function useChat(user: UserModel | null) {
    const [chat, setChat] = useState<ChatModel | null>(null);
    const [paginationDate, setPaginationDate] = useState<Date>(new Date());
    const [errors, setErrors] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user)
            return;

        const apiCall = async () => {
            setLoading(true);
            const response = await fetch(`api/messages/1/${paginationDate.toISOString()}`)

            if (response.status !== 200) {
                setErrors(response.status + ' - ' + response.text);
                setLoading(false);
                return;
            }

            const messages = await response.json() as MessageModel[];
            setChat((chat) => {
                const messagesPaginationExtension = [...messages, ...chat?.messages ?? []]
                return { ...chat, messages: messagesPaginationExtension }
            });
            setLoading(false);
        }

        apiCall()
    }, [user, paginationDate]);

    const loadMoreMessages = useCallback(() => {
        if (loading) return;

        const lastMessageDate = chat?.messages[0].dateCreated
        if (lastMessageDate) {
            setPaginationDate(new Date(lastMessageDate + 'Z'));
        }
    }, [chat, loading]);

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
        const response = await fetch('api/messages/1', requestOptions)
        if (response.status != 200) {
            setErrors(response.status + ' - ' + response.text);
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

    return { chat, loadMoreMessages, setChat, sendMessage, loading, errors }
}
