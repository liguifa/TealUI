var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ux/scroll", "ui/control", "typo/icon/icon.scss", "typo/close/close.scss", "./navTab.scss"], function (require, exports, dom, scroll_1, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个导航标签页。
     */
    class NavTab extends control_1.default {
        constructor() {
            super(...arguments);
            this.handleItemClick = (e, item) => {
                if (dom.hasClass(e.target, "x-close")) {
                    this.removeTab(item);
                }
                else {
                    this.activeTab = item;
                }
            };
            this.handleScrollClick = (e) => {
                const left = dom.hasClass(e.target, "x-navtab-left");
                scroll_1.scrollBy(this.body, { x: this.scrollSize * (left ? -1 : 1) }, this.duration);
            };
            this.handleMouseWheel = (e) => {
                scroll_1.scrollBy(this.body, { x: -e.wheelDelta }, this.duration);
            };
            this.handleScroll = (e) => {
                dom.toggleClass(this.scrollLeftHandle, "x-navtab-disabled", this.body.scrollLeft === 0);
                dom.toggleClass(this.scrollRightHandle, "x-navtab-disabled", this.body.scrollLeft + this.body.offsetWidth >= this.body.scrollWidth);
            };
            this.handleItemPointerUp = (e, item) => {
                if (e.which === 2) {
                    this.removeTab(item);
                }
            };
        }
        render() {
            return control_1.VNode.create("nav", { class: "x-navtab" },
                control_1.VNode.create("a", { href: "javascript:;", class: "x-icon x-navtab-left", style: "display: none;", onClick: this.handleScrollClick }, "\u2B9C"),
                control_1.VNode.create("a", { href: "javascript:;", class: "x-icon x-navtab-right", style: "display: none;", onClick: this.handleScrollClick }, "\u2B9E"),
                control_1.VNode.create("div", { class: "x-navtab-body", onScroll: this.handleScroll, onMouseWheel: this.handleMouseWheel },
                    control_1.VNode.create("div", { class: "x-navtab-bar", style: "left: 0;" }),
                    control_1.VNode.create("ul", { role: "tablist" })));
        }
        init() {
            dom.on(this.container, "click", "li", this.handleItemClick, this);
            dom.on(this.container, "pointerup", "li", this.handleItemPointerUp, this);
        }
        /**
         * 添加一个标签页。
         */
        addTab(tab, active = true) {
            const item = dom.parse(`<li role="tab"><button class="x-close x-icon" title="关闭" aria-label="关闭">✖</button><a href="javascript:;"></a></li>`);
            const body = item.lastChild;
            body.title = body.textContent = tab || "　";
            this.container.appendChild(item);
            this.realign(active ? item : undefined);
            return item;
        }
        /**
         * 删除一个标签页。
         */
        removeTab(tabItem) {
            const newTab = this.activeTab === tabItem && (dom.next(tabItem) || dom.prev(tabItem));
            dom.find(tabItem, ".x-close").style.opacity = "0";
            dom.animate(tabItem, { width: 0 }, () => {
                dom.remove(tabItem);
                this.realign(newTab ? newTab : undefined);
                this.onCloseTab && this.onCloseTab(tabItem);
            }, this.duration);
        }
        /**
         * 根据标签页的实际大小调整分配。
         */
        realign(activeTab = this.activeTab) {
            const containerWidth = this.body.offsetWidth;
            if (containerWidth) {
                const tabCount = this.container.childNodes.length;
                const width = Math.max(Math.min(containerWidth / tabCount, this.tabMaxWidth), this.tabMinWidth);
                for (let node = this.container.firstChild; node; node = node.nextSibling) {
                    node.style.width = width + "px";
                }
                this.activeBar.style.width = width + "px";
                const overflow = width * tabCount > containerWidth;
                dom.toggle(this.scrollLeftHandle, overflow);
                dom.toggle(this.scrollRightHandle, overflow);
                this.activeTab = activeTab;
                // 隐藏最后一个标签的 x 
                //第一个标签是激活标签的时候不应该隐藏关闭按钮
                const hideClose = dom.first(this.container) == dom.last(this.container) && activeTab != dom.first(this.container);
                this.query(".x-close").forEach((c) => {
                    dom.toggle(c, !hideClose);
                });
            }
        }
        /**
         * 激活的标签页。
         */
        get activeTab() {
            return this.find(".x-navtab-active");
        }
        set activeTab(value) {
            const active = this.activeTab;
            if (active) {
                dom.removeClass(active, "x-navtab-active");
                active.setAttribute("aria-selected", "false");
            }
            if (value) {
                dom.addClass(value, "x-navtab-active");
                value.setAttribute("aria-selected", "false");
                scroll_1.scrollIntoViewIfNeeded(value, this.body, this.duration);
                this.activeBar.style.left = (parseFloat(value.style.width) + 7) * dom.index(value) + "px";
                this.onActiveTab && this.onActiveTab(value);
            }
        }
    }
    __decorate([
        control_1.bind(".x-navtab-left")
    ], NavTab.prototype, "scrollLeftHandle", void 0);
    __decorate([
        control_1.bind(".x-navtab-right")
    ], NavTab.prototype, "scrollRightHandle", void 0);
    __decorate([
        control_1.bind(".x-navtab-body")
    ], NavTab.prototype, "body", void 0);
    __decorate([
        control_1.bind(".x-navtab-body ul")
    ], NavTab.prototype, "container", void 0);
    __decorate([
        control_1.bind(".x-navtab-bar")
    ], NavTab.prototype, "activeBar", void 0);
    exports.default = NavTab;
    NavTab.prototype.tabMaxWidth = 140;
    NavTab.prototype.tabMinWidth = 80;
    NavTab.prototype.scrollSize = 100;
});
//# sourceMappingURL=navTab.js.map