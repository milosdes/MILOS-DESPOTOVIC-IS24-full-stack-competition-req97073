import { useEffect } from 'react';

const useKeyHandler = (
    eventName: string,
    keyCodeInput: number,
    exception: string,
    callback: any
) => {
    return useEffect(() => {
        const keyHandler = ({ keyCode }: any) => {
            if (exception || keyCode !== keyCodeInput) return;
            callback();
        };
        document.addEventListener(eventName, keyHandler);
        return () => document.removeEventListener(eventName, keyHandler);
    });
};
export default useKeyHandler;
