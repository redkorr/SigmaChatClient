export interface ChatModel {
    messages: MessageModel[];
}

export interface MessageModel {
    messageId: number;
    sender: string;
    text: string;
    dateCreated: Date;
}

export interface SendMessageModel {
    chatId: number;
    sender: string;
    text: string;
}