export type MessagesSocketEventsMap = {
    'message': () => void;    
}

export type MessagesSocketEmitMap = {
    'message': (m: string) => void;
}
