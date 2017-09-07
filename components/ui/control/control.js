var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ux/nextTick"], function (require, exports, dom, nextTick_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个控件。
     */
    class Control {
        /**
         * 关联的元素。
         */
        get elem() {
            if (this.state !== 4 /* rendered */) {
                this.update();
            }
            return this._elem;
        }
        set elem(value) {
            this.state = 4 /* rendered */;
            const oldElem = this._elem;
            if (value != oldElem) {
                if (oldElem) {
                    this.uninit();
                    const parent = oldElem.parentNode;
                    if (parent) {
                        if (value) {
                            parent.replaceChild(value, oldElem);
                        }
                        else {
                            parent.removeChild(oldElem);
                        }
                    }
                    delete oldElem.__control__;
                }
                this._elem = value;
                if (value) {
                    value.__control__ = value.__control__ || this;
                    this.init();
                }
            }
        }
        /**
         * 当被子类重写时负责在关联元素后初始化当前控件。
         */
        init() { }
        /**
         * 当被子类重写时负责在元素被取消关联前取消初始化当前控件。
         */
        uninit() { }
        /**
         * 重新渲染当前控件。
         */
        update() {
            if (this.state !== 3 /* rendering */) {
                this.state = 3 /* rendering */;
                const oldVNode = this.vNode;
                const newVNode = this.vNode = this.render() || VNode.create(null, "");
                VNode.sync(newVNode, oldVNode);
                const result = newVNode.result;
                this.elem = result instanceof Control ? result.elem : result;
            }
        }
        /**
         * 当被子类重写时负责返回当前控件的虚拟节点。
         * @return 返回表示当前控件内容的虚拟节点。如果当前控件不渲染任何内容则返回 null。
         */
        render() {
            return VNode.create("div", null);
        }
        /**
         * 使当前控件无效并在下一帧重新渲染。
         */
        invalidate() {
            if (this.state === 4 /* rendered */) {
                this.state = 2 /* invalidated */;
                nextTick_1.default(() => {
                    if (this.state === 2 /* invalidated */) {
                        this.update();
                    }
                });
            }
        }
        /**
         * 内部子节点。
         */
        get children() {
            return data(this).children;
        }
        set children(value) {
            data(this).children = value;
            const body = this.body;
            if (body) {
                body.innerHTML = "";
                value.forEach(child => {
                    render(body, child);
                });
            }
            else {
                this.update();
            }
            this.layout();
        }
        /**
         * 重新布局当前控件。
         */
        layout() { }
        /**
         * 将当前控件渲染到指定的父控件或节点。
         * @param parent 要渲染的目标控件或节点。如果为 null 则移除当前控件。
         * @param refChild 在指定的子控件或节点前添加，如果为空则添加到末尾。
         */
        renderTo(parent, refChild) {
            if (parent) {
                if (this.elem) {
                    if (parent instanceof Control) {
                        parent = parent.body || parent.elem;
                    }
                    if (refChild) {
                        parent.insertBefore(this.elem, refChild instanceof Control ? refChild.elem : refChild);
                    }
                    else {
                        parent.appendChild(this.elem);
                    }
                }
            }
            else if (this._elem && this._elem.parentNode) {
                this._elem.parentNode.removeChild(this._elem);
            }
            this.layout();
        }
        /**
         * 在当前控件查找指定的子控件或节点。
         * @param selector 要查找的 CSS 选择器。如果为空则返回根控件或节点。
         * @return 返回子控件或节点。如果找不到则返回 null。
         */
        find(selector) {
            let elem = this.elem;
            if (selector) {
                elem = elem && dom.find(elem, selector);
                return elem && elem.__control__ || elem;
            }
            return this.vNode ? this.vNode.result : elem;
        }
        /**
         * 在当前控件查找匹配的所有子控件或节点。
         * @param selector 要查找的 CSS 选择器。如果为空则返回根控件或节点。
         * @return 返回子控件或节点列表。
         */
        query(selector) {
            if (selector) {
                return this.elem ? dom.query(this.elem, selector).map(elem => elem.__control__ || elem) : [];
            }
            const root = this.find(selector);
            return root ? [root] : [];
        }
        /**
         * CSS 类名。
         */
        get class() {
            return this._class || "";
        }
        set class(value) {
            if (this._class) {
                this._class.split(" ").forEach((c) => dom.removeClass(this.elem, c));
            }
            this._class = value;
            if (value) {
                value.split(" ").forEach((c) => dom.addClass(this.elem, c));
            }
        }
    }
    __decorate([
        bind("", "hidden")
    ], Control.prototype, "hidden", void 0);
    __decorate([
        bind("", "style")
    ], Control.prototype, "style", void 0);
    __decorate([
        bind("", "id")
    ], Control.prototype, "id", void 0);
    __decorate([
        bind("", "onSelectStart")
    ], Control.prototype, "onSelectStart", void 0);
    __decorate([
        bind("", "onClick")
    ], Control.prototype, "onClick", void 0);
    __decorate([
        bind("", "onAuxClick")
    ], Control.prototype, "onAuxClick", void 0);
    __decorate([
        bind("", "onDblClick")
    ], Control.prototype, "onDblClick", void 0);
    __decorate([
        bind("", "onContextMenu")
    ], Control.prototype, "onContextMenu", void 0);
    __decorate([
        bind("", "onMouseDown")
    ], Control.prototype, "onMouseDown", void 0);
    __decorate([
        bind("", "onMouseUp")
    ], Control.prototype, "onMouseUp", void 0);
    __decorate([
        bind("", "onMouseOver")
    ], Control.prototype, "onMouseOver", void 0);
    __decorate([
        bind("", "onMouseOut")
    ], Control.prototype, "onMouseOut", void 0);
    __decorate([
        bind("", "onMouseEnter")
    ], Control.prototype, "onMouseEnter", void 0);
    __decorate([
        bind("", "onMouseLeave")
    ], Control.prototype, "onMouseLeave", void 0);
    __decorate([
        bind("", "onMouseMove")
    ], Control.prototype, "onMouseMove", void 0);
    __decorate([
        bind("", "onWheel")
    ], Control.prototype, "onWheel", void 0);
    __decorate([
        bind("", "onScroll")
    ], Control.prototype, "onScroll", void 0);
    __decorate([
        bind("", "onTouchStart")
    ], Control.prototype, "onTouchStart", void 0);
    __decorate([
        bind("", "onTouchMove")
    ], Control.prototype, "onTouchMove", void 0);
    __decorate([
        bind("", "onTouchEnd")
    ], Control.prototype, "onTouchEnd", void 0);
    __decorate([
        bind("", "onTouchCancel")
    ], Control.prototype, "onTouchCancel", void 0);
    __decorate([
        bind("", "onPointerEnter")
    ], Control.prototype, "onPointerEnter", void 0);
    __decorate([
        bind("", "onPointerLeave")
    ], Control.prototype, "onPointerLeave", void 0);
    __decorate([
        bind("", "onPointerOver")
    ], Control.prototype, "onPointerOver", void 0);
    __decorate([
        bind("", "onPointerOut")
    ], Control.prototype, "onPointerOut", void 0);
    __decorate([
        bind("", "onPointerDown")
    ], Control.prototype, "onPointerDown", void 0);
    __decorate([
        bind("", "onPointerMove")
    ], Control.prototype, "onPointerMove", void 0);
    __decorate([
        bind("", "onPointerUp")
    ], Control.prototype, "onPointerUp", void 0);
    __decorate([
        bind("", "onPointerCancel")
    ], Control.prototype, "onPointerCancel", void 0);
    __decorate([
        bind("", "onGotPointerCapture")
    ], Control.prototype, "onGotPointerCapture", void 0);
    __decorate([
        bind("", "onLostPointerCapture")
    ], Control.prototype, "onLostPointerCapture", void 0);
    exports.default = Control;
    Control.prototype.state = 1 /* initial */;
    Control.prototype.duration = 200;
    /**
     * 表示控件的状态。
     */
    var ControlState;
    (function (ControlState) {
        /**
         * 初始状态。
         */
        ControlState[ControlState["initial"] = 1] = "initial";
        /**
         * 需要重新渲染。
         */
        ControlState[ControlState["invalidated"] = 2] = "invalidated";
        /**
         * 正在渲染。
         */
        ControlState[ControlState["rendering"] = 3] = "rendering";
        /**
         * 已渲染。
         */
        ControlState[ControlState["rendered"] = 4] = "rendered";
    })(ControlState = exports.ControlState || (exports.ControlState = {}));
    const emptyArray = Object.freeze([]);
    /**
     * 表示一个虚拟节点。
     */
    class VNode {
        /**
         * 初始化新的虚拟节点。
         * @param type 节点类型。如果是 null 表示文本节点；如果是字符串表示 HTML 原生节点；如果是函数表示控件。
         * @param props 节点属性。如果是文本节点则表示节点内容。
         * @param children 所有子节点。
         */
        constructor(type, props, children) {
            this.type = type;
            this.props = props;
            this.children = children;
        }
        /**
         * 添加一个或多个子节点。
         * @param child 要添加的子内容。
         * @return 返回 *child*。
         */
        append(child) {
            if (child != null) {
                if (Array.isArray(child)) {
                    for (const item of child) {
                        this.append(item);
                    }
                }
                else {
                    this.children.push(child instanceof VNode ? child : new VNode(null, child, emptyArray));
                }
            }
            return child;
        }
        /**
         * 创建一个虚拟节点。
         * @param type 节点类型。如果是 null 表示文本节点；如果是字符串表示 HTML 原生节点；如果是函数表示控件。
         * @param props 节点属性。
         * @param childNodes 所有子内容。
         * @return 返回创建的虚拟节点。
         */
        static create(type, props, ...childNodes) {
            const result = new VNode(type, props, []);
            result.append(childNodes);
            return result;
        }
        /**
         * 同步虚拟节点，创建虚拟节点对应的真实节点。
         * @param newVNode 新虚拟节点。
         * @param oldVNode 如果指定了原虚拟节点，则同步时尽量重用上次创建的真实节点。
         * @return 如果根节点发生改变则返回 true，否则返回 false。
         */
        static sync(newVNode, oldVNode) {
            // 第一步：同步根节点。
            // 如果节点类型和 ID 不变，则重用上一次生成的节点，否则重新生成。
            const type = newVNode.type;
            const changed = !oldVNode || type !== oldVNode.type || type && newVNode.props && oldVNode.props && newVNode.props.id && oldVNode.props.id && newVNode.props.id !== oldVNode.props.id;
            const isControl = typeof type === "function";
            const result = newVNode.result = changed ? type ? isControl ? new type() : document.createElement(type) : document.createTextNode(newVNode.props) : oldVNode.result;
            if (type) {
                // 第二步：同步属性。
                let body;
                let setters;
                let deletedCount;
                let forceSetSetters;
                if (isControl) {
                    // 控件的属性分为：
                    // - 自定义属性：直接赋值并标记 invalidated。
                    // - @bind 绑定的属性：更新属性值并标记 invalidated。
                    // - @bind(...) 绑定的属性：等待当前节点和子节点同步完成后设置。
                    if (!changed) {
                        for (const prop in oldVNode.props) {
                            if (!newVNode.props || !(prop in newVNode.props)) {
                                const propType = VNode.getPropType(type, prop);
                                if (propType === 1 /* state */) {
                                    delete data(result)[prop];
                                    result.state = forceSetSetters = 2 /* invalidated */;
                                }
                                else if (propType === 2 /* setter */) {
                                    setters = setters || [];
                                    deletedCount = deletedCount + 1 || 1;
                                    setters.push(prop);
                                }
                                else {
                                    delete result[prop];
                                    result.state = forceSetSetters = 2 /* invalidated */;
                                }
                            }
                        }
                    }
                    for (const prop in newVNode.props) {
                        const value = newVNode.props[prop];
                        const propType = VNode.getPropType(type, prop);
                        if (propType === 1 /* state */) {
                            if (changed || !oldVNode.props || value !== oldVNode.props[prop]) {
                                data(result)[prop] = value;
                                result.state = forceSetSetters = 2 /* invalidated */;
                            }
                        }
                        else if (propType === 2 /* setter */) {
                            setters = setters || [];
                            setters.push(prop);
                        }
                        else {
                            if (changed || !oldVNode.props || value !== oldVNode.props[prop]) {
                                result[prop] = value;
                                result.state = forceSetSetters = 2 /* invalidated */;
                            }
                        }
                    }
                    // 控件的子节点有两种更新策略：
                    // 1. 如果控件提供了 body，则将控件作为普通容器节点处理，不再重新渲染控件。
                    // 2. 否则将子节点传递给控件，控件自行处理。
                    body = result.body;
                    if (!body && (newVNode.children.length || !changed && oldVNode.children.length)) {
                        data(result).children = newVNode.children;
                        result.state = forceSetSetters = 2 /* invalidated */;
                    }
                    // 如果之前修改了属性则重新渲染当前控件。
                    if (result.state !== 4 /* rendered */) {
                        result.update();
                    }
                }
                else {
                    // HTML 元素可以直接设置所有已更改的属性。
                    for (const prop in newVNode.props) {
                        const value = newVNode.props[prop];
                        if (changed || !oldVNode.props || value !== oldVNode.props[prop] || VNode.forceSet(type, prop, result)) {
                            VNode.set(result, prop, value);
                        }
                    }
                    if (!changed) {
                        for (const prop in oldVNode.props) {
                            if (!newVNode.props || !(prop in newVNode.props)) {
                                VNode.set(result, prop, null);
                            }
                        }
                    }
                    body = result;
                }
                // 第三步：同步子节点。
                if (body) {
                    let index = 0;
                    for (const newChild of newVNode.children) {
                        const oldChild = (!changed && oldVNode.children[index++]);
                        if (VNode.sync(newChild, oldChild)) {
                            forceSetSetters = true;
                            index--;
                            const newChildResult = newChild.result;
                            const oldChildResult = oldChild ? oldChild.result : null;
                            if (newChildResult instanceof Control) {
                                newChildResult.renderTo(result, oldChildResult);
                            }
                            else if (oldChildResult) {
                                body.insertBefore(newChildResult, oldChildResult instanceof Control ? oldChildResult.elem : oldChildResult);
                            }
                            else {
                                body.appendChild(newChildResult);
                            }
                        }
                    }
                    if (!changed) {
                        for (; index < oldVNode.children.length; index++) {
                            forceSetSetters = true;
                            const oldChildResult = oldVNode.children[index].result;
                            if (oldChildResult instanceof Control) {
                                oldChildResult.renderTo(null);
                            }
                            else {
                                body.removeChild(oldChildResult);
                            }
                        }
                    }
                }
                // 第四步：当前控件和子控件全部同步完毕，重新布局。
                if (isControl) {
                    if (setters) {
                        let i = 0;
                        if (deletedCount) {
                            for (; i < deletedCount; i++) {
                                result[setters[i]] = null;
                            }
                        }
                        forceSetSetters = forceSetSetters || changed;
                        for (; i < setters.length; i++) {
                            const setter = setters[i];
                            const value = newVNode.props[setter];
                            if (forceSetSetters || !oldVNode.props || value !== oldVNode.props[setter]) {
                                result[setter] = value;
                            }
                        }
                    }
                    result.layout();
                }
            }
            else if (!changed && oldVNode.props !== newVNode.props) {
                // 第二步：同步属性。
                result.textContent = newVNode.props;
            }
            return changed;
        }
        /**
         * 判断控件类型是否包含指定的属性。
         * @param type 要判断的控件类型。
         * @param prop 要判断的属性名。
         * @return 如果属性无 get/set 操作则返回 true，否则返回 false。
         */
        static getPropType(type, prop) {
            const propTypes = VNode.getOwnPropTypes(type);
            let value = propTypes[prop];
            if (value == undefined) {
                if (type.prototype.hasOwnProperty(prop)) {
                    const descriptor = Object.getOwnPropertyDescriptor(type.prototype, prop);
                    value = descriptor && (descriptor.get || descriptor.set) ? 2 /* setter */ : 0 /* value */;
                }
                else {
                    const proto = Object.getPrototypeOf(type.prototype);
                    value = proto && proto !== Object.prototype ? VNode.getPropType(proto.constructor, prop) : 0 /* value */;
                }
                propTypes[prop] = value;
            }
            return value;
        }
        /**
         * 获取控件类型本身的属性列表。
         * @param type 控件类型。
         * @return 返回属性列表。
         */
        static getOwnPropTypes(type) {
            return type.hasOwnProperty("propTypes") ? type.propTypes : (type.propTypes = { __proto__: null });
        }
        /**
         * 判断是否需要强制更新指定的属性。
         * @param type 节点类型。
         * @param prop 节点属性。
         * @param target 要重置的控件或节点。
         * @return 如果需要强制更新则返回 true，否则返回 false。
         */
        static forceSet(type, prop, target) {
            if (prop === "value") {
                return type === "input" || type === "textarea" || type === "select";
            }
            if (type === "input") {
                return prop === "checked";
            }
            return false;
        }
        /**
         * 获取节点的属性。
         * @param target 要获取的节点。
         * @param prop 要获取的属性名。
         * @param args 附加参数。部分属性需要附加参数。
         * @param scope 事件作用域。
         * @return 返回属性值。
         */
        static get(target, prop, args, scope) {
            const hook = VNode.props[prop];
            if (hook) {
                return hook.get(target, args);
            }
            if (/^on[^a-z]/.test(prop)) {
                return data(scope || target)[args ? prop + " " + args : prop];
            }
            return dom.getAttr(target, prop);
        }
        /**
         * 设置节点的属性。
         * @param target 要设置的节点。
         * @param prop 要设置的属性名。
         * @param value 要设置的属性值。
         * @param args 附加参数。部分属性需要附加参数。
         * @param scope 事件作用域。
         */
        static set(target, prop, value = null, args, scope) {
            const hook = VNode.props[prop];
            if (hook) {
                hook.set(target, value, args);
            }
            else if (/^on[^a-z]/.test(prop)) {
                const eventName = prop.slice(2).toLowerCase();
                const datas = data(scope || target);
                const key = args ? prop + " " + args : prop;
                if (datas[key]) {
                    dom.off(target, eventName, args || "", datas[key], scope || target.__control__);
                }
                if ((datas[key] = value)) {
                    dom.on(target, eventName, args || "", value, scope || target.__control__);
                }
            }
            else {
                dom.setAttr(target, prop, value);
            }
        }
    }
    /**
     * 设置节点特殊属性的读写方式。
     */
    VNode.props = {
        __proto__: null,
        class: {
            get(elem, args) {
                if (args) {
                    return dom.hasClass(elem, args);
                }
                return elem.className;
            },
            set(elem, value, args) {
                if (args) {
                    dom.toggleClass(elem, args, value);
                }
                else {
                    elem.className = value;
                }
            }
        },
        style: {
            get(elem, args) {
                if (args) {
                    return dom.getStyle(elem, args);
                }
                return elem.style;
            },
            set(elem, value, args) {
                if (args) {
                    dom.setStyle(elem, args, value);
                }
                else if (value == null || typeof value === "string") {
                    elem.style.cssText = value;
                }
                else {
                    for (const key in value) {
                        dom.setStyle(elem, key, value[key]);
                    }
                }
            }
        },
        hidden: {
            get: dom.isHidden,
            set(elem, value, args) {
                dom.toggle(elem, !value, args);
            }
        },
        innerHTML: {
            get: dom.getHtml,
            set(elem, value) {
                if (typeof value === "string") {
                    dom.setHtml(elem, value);
                }
                else {
                    elem.innerHTML = "";
                    if (Array.isArray(value)) {
                        for (const item of value) {
                            render(elem, item);
                        }
                    }
                    else {
                        render(elem, value);
                    }
                }
            }
        }
    };
    exports.VNode = VNode;
    /**
     * 获取属性的类型。
     */
    var PropType;
    (function (PropType) {
        /**
         * 该属性是一个普通值。
         */
        PropType[PropType["value"] = 0] = "value";
        /**
         * 该属性是一个状态值。更改该属性后需要更新控件。
         */
        PropType[PropType["state"] = 1] = "state";
        /**
         * 该属性是一个自定义访问器。
         */
        PropType[PropType["setter"] = 2] = "setter";
    })(PropType = exports.PropType || (exports.PropType = {}));
    /**
     * 获取指定对象关联的数据对象。
     * @param obj 要获取的对象。
     * @return 返回一个数据对象。
     */
    function data(obj) {
        return obj.__data__ || (obj.__data__ = { __proto__: null });
    }
    exports.data = data;
    function bind(target, propertyName, selector, prop, args, descriptor) {
        // 支持 @bind(...) 语法。
        if (!target || typeof target === "string") {
            return (target2, propertyName2, descriptor2) => {
                bind(target2, propertyName2, target, propertyName, selector, descriptor2);
            };
        }
        // 将 @bind 的属性添加为绑定属性。
        if (selector == undefined) {
            VNode.getOwnPropTypes(target.constructor)[propertyName] = 1 /* state */;
        }
        Object.defineProperty(target, propertyName, selector == undefined ?
            descriptor ?
                {
                    get() {
                        const datas = data(this);
                        if (descriptor.get && !(propertyName in datas)) {
                            return descriptor.get.call(this);
                        }
                        return datas[propertyName];
                    },
                    set(value) {
                        data(this)[propertyName] = value;
                        if (descriptor.set) {
                            descriptor.set.call(this, value);
                        }
                        this.invalidate();
                    }
                } : {
                get() {
                    return data(this)[propertyName];
                },
                set(value) {
                    data(this)[propertyName] = value;
                    this.invalidate();
                }
            }
            : selector.charCodeAt(0) === 64 /*@*/ && (selector = selector.slice(1)) ?
                prop == undefined ?
                    {
                        get() {
                            return this[selector];
                        },
                        set(value) {
                            this[selector] = value;
                        }
                    } : {
                    get() {
                        return getBindProp(this[selector], prop, args, this);
                    },
                    set(value) {
                        setBindProp(this[selector], prop, value, args, this);
                    }
                }
                : prop == undefined ?
                    {
                        get() {
                            return this.find(selector);
                        },
                        set(value) {
                            Object.defineProperty(this, propertyName, {
                                value: value
                            });
                        }
                    } : {
                    get() {
                        return getBindProp(this.find(selector), prop, args, this);
                    },
                    set(value) {
                        setBindProp(this.find(selector), prop, value, args, this);
                    }
                });
    }
    exports.bind = bind;
    function getBindProp(target, prop, args, scope) {
        if (target != null) {
            if (target instanceof Node) {
                return VNode.get(target, prop, args, scope);
            }
            let value = target[prop];
            if (value && /^on[^a-z]/.test(prop)) {
                value = value.__original__ || value;
            }
            return value;
        }
    }
    function setBindProp(target, prop, value, args, scope) {
        if (target != null) {
            if (target instanceof Node) {
                VNode.set(target, prop, value, args, scope);
            }
            else {
                if (value && /^on[^a-z]/.test(prop)) {
                    const original = value;
                    value = function () {
                        if (arguments[arguments.length - 1] === target) {
                            arguments[arguments.length - 1] = scope;
                        }
                        return original.apply(scope, arguments);
                    };
                    value.__original__ = original;
                }
                target[prop] = value;
            }
        }
    }
    /**
     * 获取一个控件或节点。
     * @param value 一个虚拟节点、节点、控件、选择器或 HTML 片段。]
     * @param oldVNode 上一次生成的节点。
     * @return 返回一个控件或节点。如果找不到则返回 null。
     */
    function from(value, oldVNode) {
        if (value instanceof VNode) {
            if (!value.result) {
                VNode.sync(value, oldVNode);
            }
            value = value.result;
        }
        else {
            if (typeof value === "string") {
                if (value.charCodeAt(0) === 60 /*<*/) {
                    value = dom.parse(value);
                }
                else {
                    value = dom.find(value);
                }
            }
            else if (typeof value !== "object") {
                value = dom.parse(JSON.stringify(value));
            }
            value = value && value.__control__ || value;
        }
        return value;
    }
    exports.from = from;
    /**
     * @param parent 要渲染的容器节点。
     * 将指定的内容渲染到指定的容器。
     * @param content 要渲染的内容。可以是一个虚拟节点、节点、控件、选择器或 HTML 片段。
     * @param oldVNode 上一次生成的节点。
     * @return 返回生成的节点。
     */
    function render(parent, content, oldVNode) {
        content = from(content, oldVNode);
        if (content instanceof Control) {
            content.renderTo(parent);
        }
        else if (content) {
            (parent instanceof Control ? parent.elem : parent).appendChild(content);
        }
        return content;
    }
    exports.render = render;
});
//# sourceMappingURL=control.js.map