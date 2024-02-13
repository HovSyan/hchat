import LoginImage from '../login-image/LoginImage';
import LoginNicknameInput from '../login-nickname-input/LoginNicknameInput';
import { Controller, FormState, SubmitHandler, useForm } from 'react-hook-form';
import Notification from '../notification/Notification';

import './Login.scss';
import userService from '../../services/user.service';
import { useEffect, useMemo } from 'react';
import uuidService from '../../services/uuid.service';
import avatarService from '../../services/avatar.service';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../../configs/localStorage.config';
import localStorageService from '../../services/local-storage.service';

type LoginForm = {
    nickname: string,
    profile_img: string,
}

export default function Login() {
    const navigate = useNavigate();
    const { control, handleSubmit, formState } = useForm<LoginForm>({
        defaultValues: {
            nickname: '',
            profile_img: useMemo(() => `https://robohash.org/${uuidService.id()}`, [])
        },
        resetOptions: {
            keepErrors: true
        },
        mode: 'all'
    });

    useEffect(() => {
        if (localStorageService.getUserId()) {
            navigate('/');
        }
    }, []);
    
    const onSubmit: SubmitHandler<LoginForm> = async ({ nickname, profile_img }) => { 
        const file = await avatarService.fileFromSrc(profile_img);
        const user = await userService.newUser(nickname, file);
        localStorage.setItem(LOCAL_STORAGE_KEYS.user, user.id.toString());
        navigate('/');
    };

    return <>
        <form 
            className="login"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="login__title">
                Hey champion! <span className="login__title--sub">Fill up your profile so others can recognize you!</span>
            </h1>

            <Controller
                name='profile_img'
                control={control}
                render={({ field }) => (<LoginImage onChange={field.onChange} value={field.value} />)}
            />
            <Controller 
                name='nickname'
                control={control}
                render={({ field }) => (<LoginNicknameInput onChange={field.onChange} />)}
                rules={{
                    required: 'You should have a nickname, mate 😊',
                    validate: nicknameValidator('Someone got this nickname 😔')
                }}   
            />
            
            <button type='submit' className={submitBtnClassName('login__submit-btn', formState)}>
                Save
            </button>
        </form>
        {formState.errors.nickname?.message && <Notification type='error' message={formState.errors.nickname.message}/>}
    </>;
}

function nicknameValidator(errorMsg: string) {
    const time = 200;
    let timeout: ReturnType<typeof setTimeout>; 

    return async (nickname: string) => {
        return new Promise<string | undefined>((res) => {
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                const exists = await userService.nicknameExists(nickname);
                console.log(exists);
                res(exists ? errorMsg : undefined);
            }, time);
        });
    };
}

function submitBtnClassName(prefix: string, formState: FormState<LoginForm>) {
    if (formState.isValidating) {
        return `${prefix} ${prefix}--loading`;
    }

    if (Object.keys(formState.errors).length && !formState.isValid) {
        return `${prefix} ${prefix}--invalid`;
    }

    if (!Object.keys(formState.errors).length && formState.isValid) {
        return `${prefix} ${prefix}--valid`;
    }

    return prefix;
}
