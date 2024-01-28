import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import './LoginNicknameInput.scss';

export type LoginNicknameInputRef = {
    nickname: string;
}

export default forwardRef(function LoginNicknameInput(_: unknown, ref: Ref<LoginNicknameInputRef>) {
    const [nickname, setNickname] = useState<string>('');

    useImperativeHandle(ref, () => ({ nickname }), [nickname]);

    return <>
        <p
            onInput={(e) => setNickname((e.target as HTMLParagraphElement).textContent || '')}
            contentEditable="true" 
            className="login-nickname-input"
        ></p>
    </>;
});
