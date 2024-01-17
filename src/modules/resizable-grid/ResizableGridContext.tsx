import { createContext, MouseEvent } from 'react';

export type TResizableGridContext = {
    onResizeStart: (event: MouseEvent, initialWidth: number, separatorType: 'before' | 'after') => unknown;
}

export default createContext<TResizableGridContext>(Object.create({}));