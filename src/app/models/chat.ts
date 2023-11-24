export interface Chat {
    messages: Message[];
}

export interface Message {
    id: string;
    sender: string;
    text: string;
}