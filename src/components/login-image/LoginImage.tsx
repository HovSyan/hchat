import { ChangeEvent, Ref, forwardRef, useEffect, useId, useImperativeHandle, useState } from 'react';
import uuidService from '../../services/uuid.service';
import img from '../../assets/images/blank-profile-picture.webp';

import './LoginImage.scss';

const AVATAR_TEXT = {
    mouseOver: 'Upload!',
    mouseOut: 'This is your avatar'
} as const;

export type LoginImageRef = {
    src: string | null
}

export default forwardRef(function LoginImage(_: unknown, ref: Ref<LoginImageRef>) {
    const id = useId();
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
    const [avatarText, setAvatarText] = useState<typeof AVATAR_TEXT[keyof typeof AVATAR_TEXT]>(AVATAR_TEXT.mouseOut);

    useEffect(() => {
        const avatar = new Image();
        avatar.onload = () => setAvatarSrc(avatar.src);
        avatar.src = `https://robohash.org/${uuidService.id()}`;
    }, []);

    useImperativeHandle(ref, () => ({ src: avatarSrc }), [avatarSrc]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const reader = new FileReader();
        reader.onload = () => setAvatarSrc(reader.result?.toString() || '');
        reader.readAsDataURL(e.target.files[0]);
    };

    return <div className='login-image'>
        <label
            style={{ backgroundImage: `var(--bg-top-layer), url(${avatarSrc || img})` }}
            className='login-image__label'
            htmlFor={id}
            onMouseOver={() => setAvatarText(AVATAR_TEXT.mouseOver)}
            onMouseOut={() => setAvatarText(AVATAR_TEXT.mouseOut)}
        >
            <span className='login-image__description'>
                <svg viewBox="0 0 100 100">
                    <path id="curve-desc" d="M 0,0 m 0,50 a 50,50 0 1,0 50,-50" fill='transparent'/>
                    <text>
                        <textPath xlinkHref="#curve-desc" fill='currentColor'>
                            {avatarText}
                        </textPath>
                    </text>
                </svg>
            </span>
        </label>
        <input
            id={id}
            hidden
            type="file"
            accept='image/*'
            onChange={onChange}
        />
    </div>;
});