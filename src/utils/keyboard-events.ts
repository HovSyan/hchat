import { KeyboardEvent } from 'react';

const ENTER_KEY_CODE = 13;

export function isEnterWithShift(e: KeyboardEvent): boolean {
    return e.shiftKey && e.keyCode === ENTER_KEY_CODE;
}

export function isEnterWithoutShift(e: KeyboardEvent): boolean {
    return !e.shiftKey && e.keyCode === ENTER_KEY_CODE;
}