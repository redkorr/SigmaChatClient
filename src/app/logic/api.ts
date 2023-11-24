import { Chat } from "../models/chat";

const address = "https://localhost:8000";

export async function getChat() {
    const address = "https://localhost:8000";

    const response = await fetch(address).then(
        (json) => json,
        (reason) => null
    );

    if (response === null || response.status !== 200) {
        return null
    }

    const json = await response.json();
    const chat = JSON.parse(json) as Chat;

    return chat;
}

export async function getMockedChat(): Promise<Chat> {
    const model = {
        messages: [
            {
                sender: "bartek",
                text: "test",
            },
            {
                sender: "Nynon",
                text: "test2",
            },
        ],
    } as Chat;

    return new Promise((resolve) => resolve(model));
}