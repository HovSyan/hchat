import { useCallback, useState } from 'react';
import Icon from '../icon/Icon';

import './Notification.scss';
import useTimeout from '../../hooks/use-timeout.hook';

export type NotificationProps = {
    type: 'error' | 'warning' | 'success';
    message: string;
    close?: boolean
}

export default function Notification({ type, message, close }: NotificationProps) {
    const [fadeOut, setFadeOut] = useState(false);

    if (close) {
        useTimeout(useCallback(() => {
            setFadeOut(true);
        }, []), 5000);
    }

    const className = `notification notification--${type} ${fadeOut ? 'notification--fade-out' : ''}`;
    return <div className={className}>
        <Icon name={type}></Icon>
        <span>{message}</span>
    </div>;
}