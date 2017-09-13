define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var parseFix;
    var parseContainer;
    /**
     * 解析一段 HTML 并创建相应的节点。
     * @param html 要解析的 HTML 片段。
     * @param context 节点所属的文档。
     * @return 返回创建的节点。如果 HTML 片段中有多个根节点，则返回一个文档片段。
     */
    function parse(html, context = document) {
        if (!parseFix) {
            const select = [1, "<select multiple='multiple'>", "</select>"];
            const table = [1, "<table>", "</table>"];
            const tr = [3, "<table><tbody><tr>", "</tr></tbody></table>"];
            parseFix = {
                __proto__: null,
                option: select,
                optgroup: select,
                thead: table,
                tbody: table,
                tfoot: table,
                caption: table,
                colgroup: table,
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: tr,
                th: tr,
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"]
            };
            parseContainer = document.createElement("div");
        }
        let container = context === document ? parseContainer : context.createElement("div");
        const match = /^<(\w+)/.exec(html);
        const wrapper = match && parseFix[match[1].toLowerCase()];
        if (wrapper) {
            container.innerHTML = wrapper[1] + html + wrapper[2];
            for (let level = wrapper[0]; level--; container = container.lastChild)
                ;
        }
        else {
            container.innerHTML = html;
        }
        let result = container.firstChild || context.createTextNode(html);
        if (result.nextSibling) {
            result = context.createDocumentFragment();
            while (container.firstChild) {
                result.appendChild(container.firstChild);
            }
        }
        return result;
    }
    exports.parse = parse;
    function query(parent, selector) {
        return Array.prototype.slice.call(querySelector(parent, selector), 0);
    }
    exports.query = query;
    function find(parent, selector) {
        return querySelector(parent, selector, true);
    }
    exports.find = find;
    function querySelector(parent, selector, first) {
        if (typeof parent === "string") {
            selector = parent;
            parent = document;
        }
        return first ? parent.querySelector(selector) : parent.querySelectorAll(selector);
    }
    /**
     * 判断元素是否匹配指定的 CSS 选择器。
     * @param elem 相关的元素。
     * @param selector 要判断的 CSS 选择器。
     * @return 如果匹配则返回 true，否则返回 false。
     * @example match(document.body, "body") // true
     */
    function match(elem, selector) {
        if (elem.matches) {
            return elem.matches(selector);
        }
        const parent = elem.parentNode;
        const actualParent = parent || elem.ownerDocument.documentElement;
        parent || actualParent.appendChild(elem);
        try {
            return Array.prototype.indexOf.call(querySelector(actualParent, selector), elem) >= 0;
        }
        finally {
            parent || actualParent.removeChild(elem);
        }
    }
    exports.match = match;
    /**
     * 获取节点的第一个子元素。
     * @param node 相关的节点。
     * @param selector 用于筛选元素的 CSS 选择器。
     * @return 返回一个元素。如果元素不存在或不匹配指定的 CSS 选择器则返回 null。
     */
    function first(node, selector) {
        return walk(node, selector, "nextSibling", "firstChild");
    }
    exports.first = first;
    /**
     * 获取节点的最后一个子元素。
     * @param node 相关的节点。
     * @param selector 用于筛选元素的 CSS 选择器。
     * @return 返回一个元素。如果元素不存在或不匹配指定的 CSS 选择器则返回 null。
     */
    function last(node, selector) {
        return walk(node, selector, "previousSibling", "lastChild");
    }
    exports.last = last;
    /**
     * 获取节点的下一个相邻元素。
     * @param node 相关的节点。
     * @param selector 用于筛选元素的 CSS 选择器。
     * @return 返回一个元素。如果元素不存在或不匹配指定的 CSS 选择器则返回 null。
     */
    function next(node, selector) {
        return walk(node, selector, "nextSibling");
    }
    exports.next = next;
    /**
     * 获取节点的上一个相邻元素。
     * @param node 相关的节点。
     * @param selector 用于筛选元素的 CSS 选择器。
     * @return 返回一个元素。如果元素不存在或不匹配指定的 CSS 选择器则返回 null。
     */
    function prev(node, selector) {
        return walk(node, selector, "previousSibling");
    }
    exports.prev = prev;
    /**
     * 获取指定节点的父元素。
     * @param node 相关的节点。
     * @param selector 用于筛选元素的 CSS 选择器。
     * @return 返回一个元素。如果元素不存在或不匹配指定的 CSS 选择器则返回 null。
     */
    function parent(node, selector) {
        return walk(node, selector, "parentNode");
    }
    exports.parent = parent;
    function walk(node, selector, nextProp, firstProp = nextProp) {
        for (node = node[firstProp]; node; node = node[nextProp]) {
            if (node.nodeType === 1 && (!selector || match(node, selector))) {
                return node;
            }
        }
        return null;
    }
    /**
     * 从指定节点开始向父元素查找第一个匹配指定 CSS 选择器的元素。
     * @param node 相关的节点。
     * @param selector 要匹配的 CSS 选择器。
     * @param context 如果提供了上下文则只在指定的元素范围内搜索，否则在整个文档查找。
     * @return 返回一个元素。如果找不到匹配的元素则返回 null。
     * @example closest(document.body, "body")
     */
    function closest(node, selector, context) {
        while (node && node !== context && (node.nodeType !== 1 || !match(node, selector))) {
            node = node.parentNode;
        }
        return node === context ? null : node;
    }
    exports.closest = closest;
    /**
     * 获取指定节点的所有子元素。
     * @param node 相关的节点。
     * @param selector 用于筛选元素的 CSS 选择器。
     * @return 返回包含所有子元素的数组。
     */
    function children(node, selector) {
        const result = [];
        for (node = node.firstChild; node; node = node.nextSibling) {
            if (node.nodeType === 1 && (!selector || match(node, selector))) {
                result.push(node);
            }
        }
        return result;
    }
    exports.children = children;
    /**
     * 判断指定节点是否包含另一个节点。
     * @param node 相关的节点。
     * @param child 要判断的子节点。
     * @return 如果 *child* 同 *node* 或 *child* 是 *node* 的子节点则返回 true，否则返回 false。
     * @example contains(document.body, document.body) // true
     */
    function contains(node, child) {
        if (node.contains) {
            return node.contains(child);
        }
        for (; child; child = child.parentNode) {
            if (child === node) {
                return true;
            }
        }
        return false;
    }
    exports.contains = contains;
    /**
     * 获取指定节点在其父节点中的索引。
     * @param node 相关的节点。
     * @return 返回从 0 开始的索引。计算时忽略元素以外的节点。如果没有父节点则返回 0。
     */
    function index(node) {
        let result = 0;
        while ((node = node.previousSibling)) {
            if (node.nodeType === 1) {
                result++;
            }
        }
        return result;
    }
    exports.index = index;
    /**
     * 在指定节点末尾插入一段 HTML 或一个节点。
     * @param node 相关的节点。
     * @param content 要插入的 HTML 或节点。
     * @return 返回插入的新节点。
     */
    function append(node, content) {
        return insert(node, content, false, false);
    }
    exports.append = append;
    /**
     * 在指定节点开头插入一段 HTML 或一个节点。
     * @param node 相关的节点。
     * @param content 要插入的 HTML 或节点。
     * @return 返回插入的新节点。
     */
    function prepend(node, content) {
        return insert(node, content, true, false);
    }
    exports.prepend = prepend;
    /**
     * 在指定节点前插入一段 HTML 或一个节点。
     * @param node 相关的节点。该节点必须具有父节点。
     * @param content 要插入的 HTML 或节点。
     * @return 返回插入的新节点。
     */
    function before(node, content) {
        return insert(node, content, true, true);
    }
    exports.before = before;
    /**
     * 在指定节点后插入一段 HTML 或一个节点。
     * @param node 相关的节点。该节点必须具有父节点。
     * @param content 要插入的 HTML 或节点。
     * @return 返回插入的新节点。
     */
    function after(node, content) {
        return insert(node, content, false, true);
    }
    exports.after = after;
    function insert(node, content, prepend, sibling) {
        if (content) {
            if (typeof content === "string") {
                content = parse(content, node.ownerDocument || node);
            }
            if (sibling) {
                return node.parentNode.insertBefore(content, prepend ? node : node.nextSibling);
            }
            return prepend ? node.insertBefore(content, node.firstChild) : node.appendChild(content);
        }
    }
    /**
     * 移除指定的节点。
     * @param node 要移除的节点。
     */
    function remove(node) {
        node && node.parentNode && node.parentNode.removeChild(node);
    }
    exports.remove = remove;
    /**
     * 复制指定的节点。
     * @param node 要复制的节点。
     * @return 返回复制的新节点。
     */
    function clone(node) {
        return node.cloneNode(true);
    }
    exports.clone = clone;
    /**
     * 获取指定元素的属性值。
     * @param elem 相关的元素。
     * @param attrName 要获取的属性名（使用骆驼规则，如 `readOnly`）。
     * @return 返回属性值。如果属性不存在则返回 null。
     * @example getAttr(document.body, "class")
     */
    function getAttr(elem, attrName) {
        return attrName in elem ? elem[attrName] : elem.getAttribute(attrName);
    }
    exports.getAttr = getAttr;
    /**
     * 设置指定元素的属性值。
     * @param elem 相关的元素。
     * @param attrName 要设置的属性名（使用骆驼规则，如 `readOnly`）。
     * @param value 要设置的属性值。设置为 null 表示删除属性。
     * @example setAttr(document.body, "class", "red")
     * @example setAttr(document.body, "class", null)
     */
    function setAttr(elem, attrName, value) {
        if (attrName in elem && (typeof value !== "string" || !/^on./.test(attrName)) || value != null && typeof value !== "string") {
            if (value == null && typeof elem[attrName] === "string") {
                value = "";
            }
            elem[attrName] = value;
        }
        else if (value == null) {
            elem.removeAttribute(attrName);
        }
        else {
            elem.setAttribute(attrName, value);
        }
    }
    exports.setAttr = setAttr;
    /**
     * 获取指定元素的文本内容。
     * @param elem 相关的元素。
     * @return 返回文本内容。对于输入框则返回其输入值。
     * @example getText(document.body)
     */
    function getText(elem) {
        return elem[textProp(elem)];
    }
    exports.getText = getText;
    /**
     * 设置指定元素的文本内容。
     * @param elem 相关的元素。
     * @param value 要设置的文本内容。对于输入框则设置其输入值。
     * @example setText(document.body, "text")
     */
    function setText(elem, value) {
        elem[textProp(elem)] = value;
    }
    exports.setText = setText;
    function textProp(elem) {
        return /^(INPUT|SELECT|TEXTAREA)$/.test(elem.tagName) ? "value" : "textContent";
    }
    /**
     * 获取指定元素的内部 HTML。
     * @param elem 相关的元素。
     * @return 返回内部 HTML。
     * @example getHtml(document.body)
     */
    function getHtml(elem) {
        return elem.innerHTML;
    }
    exports.getHtml = getHtml;
    /**
     * 设置指定元素的内部 HTML。
     * @param elem 相关的元素。
     * @param value 要设置的内部 HTML。
     * @example setHtml(document.body, "html")
     */
    function setHtml(elem, value) {
        elem.innerHTML = value;
    }
    exports.setHtml = setHtml;
    /**
     * 判断指定元素是否已添加指定的 CSS 类名。
     * @param elem 相关的元素。
     * @param className 要判断的 CSS 类名（只能有一个）。
     * @return 如果已添加则返回 true，否则返回 false。
     */
    function hasClass(elem, className) {
        return (" " + elem.className + " ").indexOf(" " + className + " ") >= 0;
    }
    exports.hasClass = hasClass;
    /**
     * 添加指定元素的 CSS 类名。
     * @param elem 相关的元素。
     * @param className 要添加的 CSS 类名（只能有一个）。
     * @example addClass(document.body, "light")
     */
    function addClass(elem, className) {
        toggleClass(elem, className, true);
    }
    exports.addClass = addClass;
    /**
     * 删除指定元素的 CSS 类名。
     * @param elem 相关的元素。
     * @param className 要删除的 CSS 类名（只能有一个）。
     * @example removeClass(document.body, "light")
     */
    function removeClass(elem, className) {
        toggleClass(elem, className, false);
    }
    exports.removeClass = removeClass;
    /**
     * 如果存在（不存在）则删除（添加）指定元素的 CSS 类名。
     * @param elem 相关的元素。
     * @param className 要添加或删除的 CSS 类名（只能有一个）。
     * @param value 如果为 true 则强制添加 CSS 类名，如果为 false 则强制删除 CSS 类名。
     * @example toggleClass(document.body, "light")
     */
    function toggleClass(elem, className, value) {
        if (hasClass(elem, className)) {
            if (!value) {
                elem.className = (" " + elem.className + " ").replace(" " + className + " ", " ").trim();
            }
        }
        else if (value === undefined || value) {
            elem.className = elem.className ? elem.className + " " + className : className;
        }
    }
    exports.toggleClass = toggleClass;
    /**
     * 为指定的 CSS 属性添加当前浏览器特定的后缀（如 `webkit-`)。
     * @param propName 相关的 CSS 属性名。
     * @return 返回已添加后缀的 CSS 属性名。
     * @example vendor("transform")
     */
    function vendor(propName) {
        if (!(propName in document.documentElement.style)) {
            const capName = propName.charAt(0).toUpperCase() + propName.slice(1);
            for (const prefix of ["webkit", "Moz", "ms", "O"]) {
                if ((prefix + capName) in document.documentElement.style) {
                    return prefix + capName;
                }
            }
        }
        return propName;
    }
    exports.vendor = vendor;
    /**
     * 获取指定元素的实际 CSS 属性值。
     * @param elem 相关的元素。
     * @param propName 要获取的 CSS 属性名（使用骆驼规则，如 `fontSize`）。
     * @return 返回 CSS 属性值。
     * @example getStyle(document.body, "fontSize")
     */
    function getStyle(elem, propName) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem)[vendor(propName)];
    }
    exports.getStyle = getStyle;
    /**
     * 设置指定元素的 CSS 属性值。
     * @param elem 相关的元素。
     * @param propName 要设置的 CSS 属性名（使用骆驼规则，如 `fontSize`）。
     * @param value 要设置的 CSS 属性值。如果是数字则自动追加像素单位。
     * @example setStyle(document.body, "fontSize")
     */
    function setStyle(elem, propName, value) {
        elem.style[vendor(propName)] = value && typeof value === "number" && !/^(?:columnCount|fillOpacity|flexGrow|flexShrink|fontWeight|lineHeight|opacity|order|orphans|widows|zIndex|zoom)$/.test(propName) ? value + "px" : value;
    }
    exports.setStyle = setStyle;
    /**
     * 计算一个元素的样式值。
     * @param elem 要计算的元素。
     * @param propNames 要计算的 CSS 属性名（使用骆驼规则，如 `fontSize`）列表。
     * @return 返回所有 CSS 属性值的和。
     * @example computeStyle(document.body, "fontSize", "lineHeight")
     */
    function computeStyle(elem, ...propNames) {
        let result = 0;
        const computedStyle = elem.ownerDocument.defaultView.getComputedStyle(elem);
        for (const prop of propNames) {
            result += parseFloat(computedStyle[prop]) || 0;
        }
        return result;
    }
    exports.computeStyle = computeStyle;
    /**
     * 获取指定元素的滚动距离。
     * @param elem 相关的元素或文档。
     * @return 返回坐标。如果元素不可滚动则返回原点。
     * @example getScroll(document.body)
     */
    function getScroll(elem) {
        if (elem.nodeType === 9) {
            const win = elem.defaultView;
            if ("pageXOffset" in win) {
                return {
                    x: win.pageXOffset,
                    y: win.pageYOffset
                };
            }
            elem = elem.documentElement;
        }
        return {
            x: elem.scrollLeft,
            y: elem.scrollTop
        };
    }
    exports.getScroll = getScroll;
    /**
     * 设置指定元素的滚动距离。
     * @param elem 相关的元素或文档。
     * @param value 要设置的坐标。允许只设置部分属性。
     * @example setScroll(document.body, { x: 100, y: 500 });
     */
    function setScroll(elem, value) {
        if (elem.nodeType === 9) {
            elem.defaultView.scrollTo((value.x == null ? getScroll(elem) : value).x, (value.y == null ? getScroll(elem) : value).y);
        }
        else {
            if (value.x != null)
                elem.scrollLeft = value.x;
            if (value.y != null)
                elem.scrollTop = value.y;
        }
    }
    exports.setScroll = setScroll;
    /**
     * 获取指定元素和其定位父元素的偏移距离。
     * @param elem 相关的元素。
     * @return 返回坐标。
     * @example getOffset(document.body)
     */
    function getOffset(elem) {
        const left = getStyle(elem, "left");
        const top = getStyle(elem, "top");
        if ((left && top && left !== "auto" && top !== "auto") || getStyle(elem, "position") !== "absolute") {
            return {
                x: parseFloat(left) || 0,
                y: parseFloat(top) || 0
            };
        }
        const parent = offsetParent(elem);
        const rect = getRect(elem);
        if (parent.nodeName !== "HTML") {
            const rootRect = getRect(parent);
            rect.x -= rootRect.x;
            rect.y -= rootRect.y;
        }
        rect.x -= computeStyle(elem, "marginLeft") + computeStyle(parent, "borderLeftWidth");
        rect.y -= computeStyle(elem, "marginTop") + computeStyle(parent, "borderTopWidth");
        return rect;
    }
    exports.getOffset = getOffset;
    /**
     * 设置指定元素和其定位父元素的偏移距离。
     * @param elem 相关的元素。
     * @param value 要设置的坐标。允许只设置部分属性。
     * @example setOffset(document.body, { x: 100 });
     */
    function setOffset(elem, value) {
        if (value.x >= 0) {
            elem.style.left = value.x + "px";
        }
        if (value.y >= 0) {
            elem.style.top = value.y + "px";
        }
    }
    exports.setOffset = setOffset;
    /**
     * 获取指定元素的定位父元素。
     * @param elem 相关的元素。
     * @return 返回定位父元素。
     * @example offsetParent(document.body)
     */
    function offsetParent(elem) {
        let result = elem;
        while ((result = result.offsetParent) && result.nodeName !== "HTML" && getStyle(result, "position") === "static")
            ;
        return result || elem.ownerDocument.documentElement;
    }
    exports.offsetParent = offsetParent;
    /**
     * 获取指定元素的区域。
     * @param elem 相关的元素或文档。
     * @return 返回元素实际占用区域（含内边距和边框、不含外边距）。如果元素不可见则返回空区域。
     * @example getRect(document.body)
     */
    function getRect(elem) {
        const doc = elem.ownerDocument || elem;
        const html = doc.documentElement;
        const result = getScroll(doc);
        if (elem.nodeType === 9) {
            result.width = html.clientWidth;
            result.height = html.clientHeight;
        }
        else {
            const rect = elem.getBoundingClientRect();
            result.x += rect.left - html.clientLeft;
            result.y += rect.top - html.clientTop;
            result.width = rect.width;
            result.height = rect.height;
        }
        return result;
    }
    exports.getRect = getRect;
    /**
     * 设置指定元素的区域。
     * @param elem 相关的元素。
     * @param value 要设置的区域内容（含内边距和边框、不含外边距）。允许只设置部分属性。
     * @example setRect(document.body, {width: 200, height: 400})
     */
    function setRect(elem, value) {
        const style = elem.style;
        if (value.x != null || value.y != null) {
            // 确保对象可移动。
            if (!/^(?:abs|fix)/.test(getStyle(elem, "position"))) {
                style.position = "relative";
            }
            const currentPosition = getRect(elem);
            const offset = getOffset(elem);
            if (value.y != null) {
                style.top = offset.y + value.y - currentPosition.y + "px";
            }
            if (value.x != null) {
                style.left = offset.x + value.x - currentPosition.x + "px";
            }
        }
        if (value.width != null || value.height != null) {
            const boxSizing = getStyle(elem, "boxSizing") === "border-box";
            if (value.width != null) {
                style.width = value.width - (boxSizing ? 0 : computeStyle(elem, "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight")) + "px";
            }
            if (value.height != null) {
                style.height = value.height - (boxSizing ? 0 : computeStyle(elem, "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom")) + "px";
            }
        }
    }
    exports.setRect = setRect;
    var eventFix;
    function on(elem, eventName, selector, listener, thisArg) {
        if (!eventFix) {
            const isEnterOrLeave = (e, target) => /(?:ter|e)$/.test(e.type) || !contains(target, e.relatedTarget);
            eventFix = {
                __proto__: null,
                // focus/blur 不支持冒泡，委托时使用 foucin/foucsout。
                focus: { delegate: "focusin" },
                blur: { delegate: "focusout" },
                // mouseenter/mouseleave 不支持冒泡，委托时使用 mouseover/mouseout。
                mouseenter: { delegate: "mouseover", filter: isEnterOrLeave },
                mouseleave: { delegate: "mouseout", filter: isEnterOrLeave },
                // pointerenter/pointerleave 不支持冒泡，委托时使用 pointerover/pointerout。
                pointerenter: { delegate: "pointerover", filter: isEnterOrLeave },
                pointerleave: { delegate: "pointerout", filter: isEnterOrLeave },
                // 支持绑定原生 click。
                mouseclick: { bind: "click" }
            };
            const html = Document.prototype;
            // Firefox: 不支持 focusin/focusout 事件。
            // 注意：Chrome 实际支持 focusin/focusout 事件，但判断比较复杂，所以按不支持处理。
            if (!("onfocusin" in html)) {
                const focusAdd = function (elem, listener) {
                    elem.addEventListener(this.bind, listener, true);
                };
                const focusRemove = function (elem, listener) {
                    elem.removeEventListener(this.bind, listener, true);
                };
                eventFix.focusin = { bind: "focus", add: focusAdd, remove: focusRemove };
                eventFix.focusout = { bind: "blur", add: focusAdd, remove: focusRemove };
            }
            // Firefox/Chrome 30-: 不支持 mouseenter/mouseleave 事件。
            if (!("onmouseenter" in html)) {
                eventFix.mouseenter.bind = "mouseover";
                eventFix.mouseleave.bind = "mouseout";
            }
            // Firefox: 不支持 mousewheel 事件。
            if (!("onmousewheel" in html)) {
                eventFix.mousewheel = {
                    bind: "DOMMouseScroll",
                    filter(e) {
                        // 统一使用 wheelDelta 获取滚轮距离。
                        e.wheelDelta = -(e.detail || 0) / 3;
                    }
                };
            }
            // 低版本浏览器：不支持 auxclick 事件。
            if (!("onauxclick" in html)) {
                eventFix.auxclick = {
                    bind: "mouseup",
                    filter: (e) => e.which === 3
                };
            }
            // 低版本浏览器：不支持 pointer* 事件。
            if (!("onpointerdown" in html)) {
                eventFix.pointerover = { bind: "mouseover" };
                eventFix.pointerout = { bind: "mouseout" };
                eventFix.pointerenter.bind = eventFix.mouseenter.bind || "mouseenter";
                eventFix.pointerenter.delegate = "mouseover";
                eventFix.pointerleave.bind = eventFix.mouseleave.bind || "mouseleave";
                eventFix.pointerleave.delegate = "mouseout";
                eventFix.pointerdown = { bind: "mousedown" };
                eventFix.pointerup = { bind: "mouseup" };
                eventFix.pointermove = { bind: "mousemove" };
            }
            // 触屏：提速鼠标事件。
            if (window.TouchEvent) {
                const initTouchEvent = function (e) {
                    // PC Chrome: 修复触摸事件的 pageX 和 pageY 始终是 0。
                    if (!e.pageX && !e.pageY && (e.changedTouches || 0).length) {
                        Object.defineProperty(e, "pageX", { get() { return this.changedTouches[0].pageX; } });
                        Object.defineProperty(e, "pageY", { get() { return this.changedTouches[0].pageY; } });
                        Object.defineProperty(e, "clientX", { get() { return this.changedTouches[0].clientX; } });
                        Object.defineProperty(e, "clientY", { get() { return this.changedTouches[0].clientY; } });
                        Object.defineProperty(e, "which", { value: 1 });
                    }
                };
                eventFix.click = {
                    filter: initTouchEvent,
                    add(elem, listener) {
                        let state = 0;
                        elem.addEventListener("touchstart", listener.__touchStart__ = function (e) {
                            if (e.changedTouches.length === 1) {
                                state = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
                            }
                        }, false);
                        elem.addEventListener("touchend", listener.__touchEnd__ = function (e) {
                            if (state && e.changedTouches.length === 1 && Math.pow(e.changedTouches[0].pageX - state[0], 2) + Math.pow(e.changedTouches[0].pageY - state[1], 2) < 25) {
                                state = 1;
                                listener.call(elem, e);
                            }
                        }, false);
                        elem.addEventListener("click", listener.__click__ = function (e) {
                            const trigger = state !== 1;
                            state = 0;
                            trigger && listener.call(this, e);
                        }, false);
                    },
                    remove(elem, listener) {
                        elem.removeEventListener("touchstart", listener.__touchStart__, false);
                        elem.removeEventListener("touchend", listener.__touchEnd__, false);
                        elem.removeEventListener("click", listener.__click__, false);
                    }
                };
                if (eventFix.pointerout) {
                    const pointerAdd = function (elem, listener) {
                        let state = 0;
                        elem.addEventListener(this.touch, listener.__touch__ = function (e) {
                            state = 1;
                            listener.call(this, e);
                        }, false);
                        elem.addEventListener(this.bind, listener.__mouse__ = function (e) {
                            if (state) {
                                state = 0;
                            }
                            else {
                                listener.call(this, e);
                            }
                        }, false);
                    };
                    const pointerRemove = function (elem, listener) {
                        elem.removeEventListener(this.touch, listener.__touch__, false);
                        elem.removeEventListener(this.bind, listener.__mouse__, false);
                    };
                    eventFix.pointerdown = { bind: "mousedown", touch: "touchstart", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove };
                    eventFix.pointerup = { bind: "mouseup", touch: "touchend", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove };
                    eventFix.pointermove = { bind: "mousemove", touch: "touchmove", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove };
                }
            }
        }
        if (typeof selector !== "string") {
            thisArg = listener;
            listener = selector;
            selector = "";
        }
        thisArg = thisArg || elem;
        const events = elem.__events__ || (elem.__events__ = { __proto__: null });
        const key = selector ? eventName + " " + selector : eventName;
        const listeners = events[key];
        const delegateFix = eventFix[eventName] || 0;
        const bindFix = selector && delegateFix.delegate ? eventFix[eventName = delegateFix.delegate] || 0 : delegateFix;
        // 如果满足以下任一情况，需要重新封装监听器。
        // 1. 事件委托，需要重新定位目标元素。
        // 2. 事件有特殊过滤器，仅在满足条件时触发。
        // 3. 需要重写回调函数中的 this。
        // 4. 监听器具有第二参数，需要重写回调函数的第二参数。
        // 5. 监听器已添加需要重新封装才能绑定成功。
        if (selector || thisArg !== elem || bindFix.filter || listener.length > 1 || listeners && indexOfListener(listeners, listener, thisArg) >= 0) {
            const originalListener = listener;
            listener = (e) => {
                let target = thisArg;
                if (selector && (!(target = closest(e.target, selector, target)) || (delegateFix !== bindFix && delegateFix.filter && delegateFix.filter(e, target) === false))) {
                    return;
                }
                if (bindFix.filter && bindFix.filter(e, target) === false) {
                    return;
                }
                originalListener.call(thisArg, e, target);
            };
            listener.__original__ = originalListener;
            listener.__this__ = thisArg;
        }
        // 保存监听器以便之后解绑或手动触发事件。
        if (!listeners) {
            events[key] = listener;
        }
        else if (Array.isArray(listeners)) {
            listeners.push(listener);
        }
        else {
            events[key] = [listeners, listener];
        }
        // 底层绑定事件。
        bindFix.add ? bindFix.add(elem, listener) : elem.addEventListener(bindFix.bind || eventName, listener, false);
    }
    exports.on = on;
    function off(elem, eventName, selector, listener, thisArg) {
        if (typeof selector !== "string") {
            thisArg = listener;
            listener = selector;
            selector = "";
        }
        thisArg = thisArg || elem;
        const events = elem.__events__;
        const key = selector ? eventName + " " + selector : eventName;
        const listeners = events && events[key];
        if (listeners) {
            if (listener) {
                // 更新事件列表。
                const index = indexOfListener(listeners, listener, thisArg);
                if (~index) {
                    if (Array.isArray(listeners)) {
                        listener = listeners[index];
                        listeners.splice(index, 1);
                        if (!listeners.length) {
                            delete events[key];
                        }
                    }
                    else {
                        listener = listeners;
                        delete events[key];
                    }
                }
                // 底层解绑事件。
                const bindFix = eventFix && eventFix[eventName] || 0;
                bindFix.remove ? bindFix.remove(elem, listener) : elem.removeEventListener((selector ? bindFix.delegate : bindFix.bind) || eventName, listener, false);
            }
            else if (Array.isArray(listeners)) {
                for (listener of listeners) {
                    off(elem, eventName, selector, listener, thisArg);
                }
            }
            else {
                off(elem, eventName, selector, listeners, thisArg);
            }
        }
    }
    exports.off = off;
    function indexOfListener(listeners, listener, thisArg) {
        if (Array.isArray(listeners)) {
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i] === listener || listeners[i].__original__ === listener && listeners[i].__this__ === thisArg) {
                    return i;
                }
            }
            return -1;
        }
        return listeners === listener || listeners.__original__ === listener && listeners.__this__ === thisArg ? 0 : -1;
    }
    function trigger(elem, eventName, selector, event) {
        if (typeof selector !== "string") {
            event = selector;
            selector = "";
        }
        const listeners = elem.__events__[selector ? eventName + " " + selector : eventName];
        if (listeners) {
            event = event || {};
            if (!event.type)
                event.type = eventName;
            if (!event.target)
                event.target = selector ? find(elem, selector) : elem;
            if (Array.isArray(listeners)) {
                for (const listener of listeners.slice(0)) {
                    listener.call(elem, event);
                }
            }
            else {
                listeners.call(elem, event);
            }
        }
    }
    exports.trigger = trigger;
    /**
     * 存储特效相关配置。
     */
    var animateFix;
    /**
     * 执行一个自定义渐变。
     * @param elem 相关的元素。
     * @param propNames 要渐变的 CSS 属性名和最终的属性值组成的键值对。
     * @param callback 渐变执行结束的回调函数。
     * @param duration 渐变执行的总毫秒数。
     * @param timingFunction 渐变函数。可以使用 CSS3 预设的特效渐变函数。
     * @example animate(document.body, { height: 400 });
     */
    function animate(elem, propNames, callback, duration = 200, timingFunction = "ease") {
        if (!animateFix) {
            const transition = vendor("transition");
            animateFix = {
                support: transition in document.documentElement.style,
                transition: transition,
                transitionEnd: (transition + "End").replace(transition.length > 10 ? /^[A-Z]/ : /[A-Z]/, w => w.toLowerCase())
            };
        }
        if (animateFix.support && duration !== 0) {
            const context = elem.style.__animate__ || (elem.style.__animate__ = { __proto__: null });
            const setTransition = () => {
                let transition = "";
                for (const key in context) {
                    if (transition)
                        transition += ",";
                    transition += `${key.replace(/[A-Z]|^ms|^webkit/g, word => "-" + word.toLowerCase())} ${duration}ms ${timingFunction}`;
                }
                elem.style[animateFix.transition] = transition;
            };
            const end = (e) => {
                // 忽略冒泡导致的调用。
                if (timer && (!e || e.target === e.currentTarget)) {
                    clearTimeout(timer);
                    timer = 0;
                    elem.removeEventListener(animateFix.transitionEnd, end, false);
                    // 如果新的渐变覆盖了当前渐变的所有属性，则不触发本次渐变的回调函数。
                    let contextUpdated = false;
                    for (const key in context) {
                        if (context[key] === end) {
                            delete context[key];
                            contextUpdated = true;
                        }
                    }
                    if (contextUpdated) {
                        setTransition();
                        callback && callback();
                    }
                }
            };
            // 设置所有属性为起始值。
            for (let propName in propNames) {
                propName = vendor(propName);
                context[propName] = end;
                if (!elem.style[propName]) {
                    elem.style[propName] = getStyle(elem, propName);
                }
            }
            // 触发重新布局以保证效果可以触发。
            elem.offsetWidth && elem.clientLeft;
            // 设置要渐变的属性。
            setTransition();
            // 绑定渐变完成事件。
            elem.addEventListener(animateFix.transitionEnd, end, false);
            let timer = setTimeout(end, duration);
        }
        else {
            callback && setTimeout(callback, duration);
        }
        // 设置属性为最终值，触发动画。
        for (const propName in propNames) {
            setStyle(elem, propName, propNames[propName]);
        }
    }
    exports.animate = animate;
    /**
     * 判断指定的元素是否被隐藏。
     * @param elem 相关的元素。
     * @return 如果元素本身被隐藏或正在被隐藏则返回 true，否则返回 false。
     * @example isHidden(document.body)
     */
    function isHidden(elem) {
        return elem.style.__toggle__ === false || (elem.style.display || getStyle(elem, "display")) === "none";
    }
    exports.isHidden = isHidden;
    /**
     * 存储标签默认的 display 属性。
     */
    var defaultDisplays;
    /**
     * 存储内置切换动画。
     */
    var toggleAnimations;
    /**
     * 显示指定的元素。
     * @param elem 相关的元素。
     * @param animation 显示时使用的动画。
     * @param callback 动画执行完成后的回调。
     * @param duration 动画执行的总毫秒数。
     * @param timingFunction 渐变函数。可以使用 CSS3 预设的特效渐变函数。
     * @param target 动画的目标元素。
     */
    function show(elem, animation, callback, duration, timingFunction, target) {
        if (animation || callback) {
            toggle(elem, true, animation, callback, duration, timingFunction, target);
        }
        else {
            elem.style.display = elem.style.__display__ || "";
            // 如果清空内联 display 后 display 仍然为 none, 说明通过 CSS 设置了 display 属性。
            // 这时将元素强制设为 inline 或 block。
            if (getStyle(elem, "display") === "none") {
                const nodeName = elem.nodeName;
                let defaultDisplay = (defaultDisplays || (defaultDisplays = { __proto__: null }))[nodeName];
                if (!defaultDisplay) {
                    // 创建一个新节点以计算其默认的 display 属性。
                    const tmp = document.createElement(nodeName);
                    document.body.appendChild(tmp);
                    defaultDisplay = getStyle(tmp, "display");
                    document.body.removeChild(tmp);
                    // 如果计算失败则设置为默认的 block。
                    if (defaultDisplay === "none") {
                        defaultDisplay = "block";
                    }
                    // 缓存以加速下次计算。
                    defaultDisplays[nodeName] = defaultDisplay;
                }
                elem.style.display = defaultDisplay;
            }
        }
    }
    exports.show = show;
    /**
     * 隐藏指定的元素。
     * @param elem 相关的元素。
     * @param animation 显示时使用的动画。
     * @param callback 动画执行完成后的回调。
     * @param duration 动画执行的总毫秒数。
     * @param timingFunction 渐变函数。可以使用 CSS3 预设的特效渐变函数。
     * @param target 动画的目标元素。
     */
    function hide(elem, animation, callback, duration, timingFunction, target) {
        if (animation || callback) {
            toggle(elem, false, animation, callback, duration, timingFunction, target);
        }
        else {
            const currentDisplay = getStyle(elem, "display");
            if (currentDisplay !== "none") {
                elem.style.__display__ = elem.style.display;
                elem.style.display = "none";
            }
        }
    }
    exports.hide = hide;
    function toggle(elem, value, animation, callback, duration, timingFunction, target) {
        if (typeof value !== "boolean") {
            target = timingFunction;
            timingFunction = duration;
            duration = callback;
            callback = animation;
            animation = value;
            value = undefined;
        }
        if (value === undefined) {
            value = isHidden(elem);
        }
        if (typeof animation === "string") {
            animation = (toggleAnimations || (toggleAnimations = {
                opacity: { opacity: 0 },
                height: {
                    marginTop: 0,
                    borderTopWidth: 0,
                    paddingTop: 0,
                    height: 0,
                    paddingBottom: 0,
                    borderBottomWidth: 0,
                    marginBottom: 0
                },
                width: {
                    marginLeft: 0,
                    borderLeftWidth: 0,
                    paddingLeft: 0,
                    width: 0,
                    paddinRight: 0,
                    borderRightWidth: 0,
                    marginRight: 0
                },
                top: { transform: "translateY(-100%)" },
                bottom: { transform: "translateY(100%)" },
                left: { transform: "translateX(-100%)" },
                right: { transform: "translateX(100%)" },
                scale: { transform: "scale(0, 0)" },
                scaleX: { transform: "scaleX(0)" },
                scaleY: { transform: "scaleY(0)" },
                slideDown: { opacity: 0, transform: "translateY(10%)" },
                slideRight: { opacity: 0, transform: "translateX(10%)" },
                slideUp: { opacity: 0, transform: "translateY(-10%)" },
                slideLeft: { opacity: 0, transform: "translateX(-10%)" },
                zoomIn: { opacity: 0, transform: "scale(0, 0)" },
                zoomOut: { opacity: 0, transform: "scale(1.2, 1.2)" },
                rotate: { opacity: 0, transform: "rotate(180deg)" }
            }))[animation];
        }
        if (animation && duration !== 0) {
            // 优先显示元素以便后续计算。
            if (value) {
                show(elem);
            }
            // 设置渐变目标。
            // 如果正在执行渐变，计算新目标会出现错误，直接复用上次设置的目标。
            const setTransformOrigin = target && animation.transform && elem.style.__toggle__ == undefined;
            if (setTransformOrigin) {
                const targetRect = getRect(target);
                const elemRect = getRect(elem);
                setStyle(elem, "transformOrigin", `${(elemRect.x + elemRect.width <= targetRect.x + targetRect.width / 4 ? targetRect.x : targetRect.x + targetRect.width <= elemRect.x + targetRect.width / 4 ? targetRect.x + targetRect.width : targetRect.x + targetRect.width / 2) - elemRect.x}px ${(elemRect.y + elemRect.height <= targetRect.y + targetRect.height / 4 ? targetRect.y : targetRect.y + targetRect.height <= elemRect.y + targetRect.height / 4 ? targetRect.y + targetRect.height : targetRect.y + targetRect.height / 2) - elemRect.y}px`);
            }
            // 更改宽高时隐藏滚动条。
            const setOverflowX = animation.width != undefined;
            if (setOverflowX) {
                elem.style.overflowX = "hidden";
            }
            const setOverflowY = animation.height != undefined;
            if (setOverflowY) {
                elem.style.overflowY = "hidden";
            }
            // 计算渐变的最终属性。
            // 如果需要隐藏元素，则 animation 表示最终属性。
            // 如果需要显示元素，则需要手动计算最终属性。
            let to = animation;
            if (value) {
                to = {};
                // 如果正在执行渐变，则从当前位置开始渐变而非从隐藏时的值属性开始，同时停止渐变用于计算最终属性。
                let from = animation;
                if (elem.style.__toggle__ != undefined) {
                    from = {};
                    for (const prop in animation) {
                        from[prop] = getStyle(elem, prop);
                        setStyle(elem, prop, "");
                    }
                    elem.style[animateFix.transition] = "";
                }
                // 计算最终属性值并将属性重置为初始值。
                for (const prop in animation) {
                    to[prop] = getStyle(elem, prop);
                    setStyle(elem, prop, from[prop]);
                }
            }
            // 执行渐变。
            elem.style.__toggle__ = value;
            animate(elem, to, () => {
                delete elem.style.__toggle__;
                if (setOverflowX) {
                    elem.style.minWidth = elem.style.overflowX = "";
                }
                if (setOverflowY) {
                    elem.style.minHeight = elem.style.overflowY = "";
                }
                if (setTransformOrigin) {
                    setStyle(elem, "transformOrigin", "");
                }
                for (const prop in to) {
                    setStyle(elem, prop, "");
                }
                if (!value) {
                    hide(elem);
                }
                callback && callback(value);
            }, duration, timingFunction);
        }
        else {
            value ? show(elem) : hide(elem);
            callback && callback(value);
        }
    }
    exports.toggle = toggle;
    /**
     * 确保在文档加载完成后再执行指定的函数。
     * @param callback 要执行的回调函数。
     * @param context 要等待的文档对象。
     */
    function ready(callback, context = document) {
        if (/^(?:complete|loaded|interactive)$/.test(context.readyState) && context.body) {
            callback.call(context);
        }
        else {
            context.addEventListener("DOMContentLoaded", callback, false);
        }
    }
    exports.ready = ready;
});
//# sourceMappingURL=dom.js.map