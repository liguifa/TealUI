/**
 * 获取外部 HTML。
 * @param elem 相关的元素。
 */
export function getOuterHTML(elem: HTMLElement) {
    const p = elem.ownerDocument.createElement(elem.parentNode ? elem.parentNode.nodeName : "div");
    p.appendChild(elem.cloneNode(true));
    return p.innerHTML;
}

/**
 * 设置外部 HTML。
 * @param elem 相关的元素。
 * @param value 要设置的值。
 */
export function setOuterHTML(elem: HTMLElement, value: string) {
    if (elem.parentNode) {
        const p = elem.ownerDocument.createElement(elem.parentNode.nodeName);
        p.innerHTML = value;
        while (p.firstChild) {
            elem.parentNode.insertBefore(p.firstChild, elem);
        }
        elem.parentNode.removeChild(elem);
    }
}
