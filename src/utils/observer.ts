// IntersectionObserver helper utilities
// --------------------------------------
/** Observe an element once until it either becomes visible or hidden
 *  (depending on `targetVisible`), then invoke the callback and disconnect. */
export function observeOnce(
    el: Element,
    targetVisible: boolean,
    callback: () => void,
    options: IntersectionObserverInit = {}
): IntersectionObserver {
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting === targetVisible) {
                callback();
                observer.disconnect();
                return;
            }
        }
    }, options);

    observer.observe(el);
    return observer;
}
