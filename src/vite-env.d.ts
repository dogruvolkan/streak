/// <reference types="vite/client" />

// Visual Viewport API types for mobile keyboard handling
interface VisualViewport extends EventTarget {
    readonly height: number;
    readonly width: number;
    readonly offsetLeft: number;
    readonly offsetTop: number;
    readonly pageLeft: number;
    readonly pageTop: number;
    readonly scale: number;
    addEventListener(type: 'resize' | 'scroll', listener: EventListener, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: 'resize' | 'scroll', listener: EventListener, options?: boolean | EventListenerOptions): void;
}

declare global {
    interface Window {
        visualViewport?: VisualViewport;
    }
}
