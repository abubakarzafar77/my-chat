export class ChatMessage {
    $key?: string;
    email?: string;
    userName?: string;
    message?: string;
    timeStamp?: Date = new Date();
}