import './LoginNicknameInput.scss';

export type LoginNicknameInputProps = {
    onChange: (value: string) => void;
}

export default function LoginNicknameInput({ onChange }: LoginNicknameInputProps) {
    return <>
        <p
            onInput={(e) => onChange((e.target as HTMLParagraphElement).textContent || '')}
            contentEditable="true" 
            className="login-nickname-input"
        ></p>
    </>;
}
