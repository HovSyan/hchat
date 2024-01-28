import { FormEvent, useRef, useState } from 'react';
import LoginImage, { LoginImageRef } from '../login-image/LoginImage';
import LoginNicknameInput, { LoginNicknameInputRef } from '../login-nickname-input/LoginNicknameInput';
import Notification from '../notification/Notification';

import userService from '../../services/user.service';

import './Login.scss';

export default function Login() {
    const imgRef = useRef<LoginImageRef>(null);
    const nicknameRef = useRef<LoginNicknameInputRef>(null);
    const [errors, setErrors] = useState<string[] | undefined>();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        validateForm(nicknameRef.current?.nickname || '').then((result) => {
            if (result === null) {
                // Create user
            } else {
                setErrors([result]);
            }
        });
    };

    return <>
        <form 
            className="login"
            onSubmit={onSubmit}
        >
            <h1 className="login__title">
                Hey champion! <span className="login__title--sub">Fill up your profile so others can recognize you!</span>
            </h1>
            <LoginImage ref={imgRef}/>
            <LoginNicknameInput ref={nicknameRef}/>
            <button className='login__submit-btn'>Save</button>
        </form>
        {errors?.map((e) => (
            <Notification 
                key={Math.random()}
                type='error' 
                message={e}
            />
        ))}
    </>;
}

const enum VALIDATION_ERRORS {
    EMPTY_NICKNAME = 'You should have a nickname, mate 😊',
    DUPLICATE_NICKNAME = 'Someone got this nickname 😔',
}

async function validateForm(nickname: string): Promise<null | VALIDATION_ERRORS> {
    if (nickname === '') {
        return VALIDATION_ERRORS.EMPTY_NICKNAME;
    }

    if (await userService.validateNickname(nickname)) {
        return VALIDATION_ERRORS.DUPLICATE_NICKNAME;
    }

    return null;
}