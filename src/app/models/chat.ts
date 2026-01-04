export interface ChatModel {
    messages: MessageModel[];
}

export interface MessageModel {
    messageId: number;
    chatId: number;
    userNickname: string;
    text: string;
    dateCreated: Date;
}

export interface SendMessageModel {
    chatId: number;
    text: string;
}