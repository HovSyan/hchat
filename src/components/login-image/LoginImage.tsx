import { useEffect, useId, useState } from 'react';
import defaultImage from '../../assets/images/blank-profile-picture.webp';

import './LoginImage.scss';

export type LoginImageProps = {
    onChange: (src: string) => void;
    value: string;
}

export default function LoginImage({ value, onChange }: LoginImageProps) {
    const [hovered, setHovered] = useState(false);
    const [image, setImage] = useState<string>(defaultImage);
    
    useEffect(() => {
        const img = new Image();
        img.onload = () => setImage(value);
        img.onerror = () => onChange(defaultImage);
        img.src = value;
    }, [value]);
    
    const id = useId();

    return <div className='login-image'>
        <label
            style={{ backgroundImage: `var(--bg-top-layer), url(${image})` }}
            className='login-image__label'
            htmlFor={id}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
        >
            <span className='login-image__description'>
                <svg viewBox="0 0 100 100">
                    <path id="curve-desc" d="M 0,0 m 0,50 a 50,50 0 1,0 50,-50" fill='transparent'/>
                    <text>
                        <textPath xlinkHref="#curve-desc" fill='currentColor'>
                            {hovered ? 'Upload!' : 'This is your avatar'}
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
            onChange={(e) => e.target.files && onChange(URL.createObjectURL(e.target.files[0]))}
        />
    </div>;
}
