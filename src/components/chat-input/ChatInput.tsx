import { FormEvent, KeyboardEvent, useRef } from 'react';
import Icon from '../icon/Icon';

import './ChatInput.scss';
import { isEnterWithoutShift } from '../../utils/keyboard-events';

export type ChatInputProps = {
    onMessageSubmit: (msg: string) => void;
}

export default function ChatInput({ onMessageSubmit }: ChatInputProps) {
    const inputRef = useRef<HTMLParagraphElement>(null);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const msg = inputRef.current?.textContent?.trim();
        msg && onMessageSubmit(msg);
        inputRef.current && (inputRef.current.textContent = '');
    };

    const onInputChange = (event: KeyboardEvent<HTMLParagraphElement>) => {
        if (isEnterWithoutShift(event)) {
            event.preventDefault();
            event.currentTarget.closest('form')?.dispatchEvent(new Event('submit', {
                bubbles: true,
                cancelable: true
            }));
        }
    };

    return <>
        <form className='chat-input' onSubmit={onSubmit}>
            <p contentEditable={true}
                onKeyDown={onInputChange}
                ref={inputRef}
                className="chat-input__input"
                spellCheck="false"></p>
            <span className='chat-input__animation'></span>
            <button className='chat-input__send'>
                <Icon name='send'/>
            </button>
        </form>
    </>;
}