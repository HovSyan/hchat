import { MouseEvent, ReactNode, useContext, useRef } from 'react';
import ResizableGridContext from '../ResizableGridContext';

import './ResizableGridColumn.scss';

export type Separator = 'before' | 'after';
export type ResizableGridColumnProps = {
    children: ReactNode,
    width?: string;
    separator?: Separator
}

export default function ResizableGridColumn({ children, separator }: ResizableGridColumnProps) {
    const { onResizeStart } = useContext(ResizableGridContext);
    const columnRef = useRef<HTMLDivElement>(null);
    
    const onMouseDown = (e: MouseEvent) => {
        if (!columnRef.current || !separator) return;
        
        onResizeStart(e, columnRef.current?.offsetWidth || 0, separator);
    };

    const contentComp = <span className='resizable-grid-column__content'>{children} </span>;
    const separatorComp = <span className="resizable-grid-column__separator" onMouseDown={onMouseDown}></span>;

    return <div ref={columnRef} className="resizable-grid-column">
        {separator === 'before' && separatorComp}
        {contentComp}
        {separator === 'after' && separatorComp}
    </div>;
}