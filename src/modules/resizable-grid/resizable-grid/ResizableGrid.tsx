import { MouseEvent, useState, useCallback, ReactElement } from 'react';

import './ResizableGrid.scss';
import ResizableGridContext from '../ResizableGridContext';
import { Separator } from '../resizable-grid-column/ResizableGridColumn';

type ResizingEvent = { 
    event: MouseEvent, 
    initialWidth: number, 
    index: number, 
    separator: Separator
};

export type ResizableGridProps = {
    children: ReactElement[];
    onResize?: (index: number, initialWidth: number, delta: number) => unknown;
}

function getColumnIndex(column: HTMLElement) {
    const SEPARATOR_SELECTOR = 'resizable-grid-column__separator';
    return Array.from(document.getElementsByClassName(SEPARATOR_SELECTOR)).indexOf(column);
}

function getResizeDelta(separator: Separator, resizeStartEvent: MouseEvent, resizeEvent: MouseEvent) {
    const [startX, currentX] = [resizeStartEvent.clientX, resizeEvent.clientX];
    return separator === 'after' ? currentX - startX : startX - currentX;
}

export default function ResizableGrid({ children, onResize }: ResizableGridProps) {
    const [isResizing, setIsResizing] = useState<false | ResizingEvent>(false);
    const onResizeStart = useCallback((event: MouseEvent, initialWidth: number, separator: Separator) => {
        const index = getColumnIndex(event.target as HTMLElement);
        setIsResizing({ event, index, initialWidth, separator });
    }, []);
   
    const gridTemplateColumns = children?.map((c) => c.props.width || '1fr').join(' ');
    const className = `resizable-grid ${isResizing ? 'resizable-grid--resizing' : ''}`;
    
    const onMouseUp = () => {
        setIsResizing(false);
    };
    const onMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;

        const { event, initialWidth, index, separator } = isResizing;
        onResize?.(index, initialWidth, getResizeDelta(separator, event, e));
    };

    return <ResizableGridContext.Provider value={{ onResizeStart }}>
        <div
            style={{ gridTemplateColumns }}
            className={className}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >{children}</div>
    </ResizableGridContext.Provider>;
}