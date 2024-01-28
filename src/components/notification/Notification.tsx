import { useCallback, useState } from 'react';
import Icon from '../icon/Icon';

import './Notification.scss';
import useTimeout from '../../hooks/use-timeout.hook';

export type NotificationProps = {
    type: 'error' | 'warning' | 'success';
    message: string;
}

export default function Notification({ type, message }: NotificationProps) {
    const [fadeOut, setFadeOut] = useState(false);

    useTimeout(useCallback(() => {
        setFadeOut(true);
    }, []), 5000);

    const className = `notification notification--${type} ${fadeOut && 'notification--fade-out'}`;
    return <div className={className}>
        <Icon name={type}></Icon>
        <span>{message}</span>
    </div>;
}