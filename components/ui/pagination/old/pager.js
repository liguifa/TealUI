var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "control", "./pager.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个分页器。
     */
    class Pager extends control_1.Control {
        constructor() {
            super(...arguments);
            /**
             * 当前页数。页数从 1 开始。
             */
            this.currentPage = 1;
            /**
             * 每页的条数。
             */
            this.pageSize = 20;
            /**
             * 首尾保留的页数。
             */
            this.minSize = 2;
            /**
             * 最多显示的页数(不含上一页和下一页)。建议设置为奇数。
             */
            this.maxSize = 9;
        }
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            console.assert(this.currentPage > 0 && this.currentPage <= this.pageCount);
            console.assert(this.minSize >= 0);
            console.assert(this.maxSize > this.minSize * 2);
            let html = "";
            function append(tpl, page) {
                html += tpl.replace(/{page}/g, page);
            }
            let start = Math.max(this.currentPage - Math.floor((this.maxSize - 1) / 2), 1);
            let end = start + this.maxSize - 1;
            if (end > this.pageCount) {
                start = Math.max(start - end + this.pageCount, 1);
                end = this.pageCount;
            }
            let leftEllipsis = false;
            let rightEllipsis = false;
            if (this.minSize > 0) {
                if (start > 1) {
                    leftEllipsis = true;
                    start += this.minSize;
                }
                if (end < this.pageCount) {
                    rightEllipsis = true;
                    end -= this.minSize;
                }
            }
            append(this.currentPage <= 1 ? Pager.locale.prevDisabled : Pager.locale.prev, this.currentPage - 1);
            if (leftEllipsis) {
                for (let p = 1; p <= this.minSize; p++) {
                    append(Pager.locale.item, p);
                }
                html += Pager.locale.ellipsis;
            }
            for (let p = start; p <= end; p++) {
                append(p === this.currentPage ? Pager.locale.itemDisabled : Pager.locale.item, p);
            }
            if (rightEllipsis) {
                html += Pager.locale.ellipsis;
                for (let p = this.pageCount - this.minSize + 1; p <= this.pageCount; p++) {
                    append(Pager.locale.item, p);
                }
            }
            append(this.currentPage >= this.pageCount ? Pager.locale.nextDisabled : Pager.locale.next, this.currentPage + 1);
            return control_1.VNode.create("nav", { class: "x-pager" },
                control_1.VNode.create("div", { class: "x-pager-header" },
                    "\u6BCF\u9875",
                    control_1.VNode.create("span", { class: "x-picker" },
                        control_1.VNode.create("input", { type: "text", class: "x-textbox", value: this.pageSize.toString() }),
                        control_1.VNode.create("button", { class: "x-button" },
                            control_1.VNode.create("i", { class: "x-icon" }, "\u2B9F"))),
                    "\u884C\uFF0C\u5171 200 \u6761"),
                control_1.VNode.create("div", { class: "x-pager-footer", innerHTML: html, onClick: this.handleClick },
                    control_1.VNode.create("div", null),
                    control_1.VNode.create("a", { href: "###" },
                        control_1.VNode.create("span", { class: "x-icon" }, "\u2B9C"),
                        "\u4E0A\u4E00\u9875"),
                    control_1.VNode.create("a", { class: "x-pager-active", href: "###" }, "1"),
                    control_1.VNode.create("a", { href: "###" }, "2"),
                    "...",
                    control_1.VNode.create("a", { href: "###" }, "99"),
                    control_1.VNode.create("a", { href: "###" }, "100"),
                    control_1.VNode.create("a", { href: "###" },
                        "\u4E0B\u4E00\u9875 ",
                        control_1.VNode.create("span", { class: "x-icon" }, "\u2B9E")),
                    control_1.VNode.create("form", { style: "margin-left: 2em; display: inline" },
                        "\u8DF3\u81F3\uFF1A",
                        control_1.VNode.create("input", { type: "number", class: "x-textbox x-page-current", value: "1", min: "1", max: "4" }),
                        " \u9875",
                        control_1.VNode.create("input", { type: "submit", class: "x-button  x-page-goto-page", value: "跳转", style: "min-width: 60px;" }))));
        }
        /**
         * 总页数。
         */
        get pageCount() {
            return Math.ceil(this.total / this.pageSize);
        }
        set pageCount(value) {
            this.total = this.pageSize * value;
        }
        handleClick(e) {
            const page = e.target.getAttribute("data-value");
            if (page) {
                this.onSelect && this.onSelect(+page);
            }
        }
    }
    /**
     * 存储本地化文案配置。
     */
    Pager.locale = {
        item: `<a href="javascript://第 {page} 页" title="转到：第 {page} 页" data-value="{page}">{page}</a>`,
        itemDisabled: `<a class="x-pager-active">{page}</a>`,
        prev: `<a href="javascript://第 {page} 页" class="x-pager-prev" title="转到：第 {page} 页" data-value="{page}"><i class="x-icon">⮜</i>上一页</a>`,
        prevDisabled: ``,
        next: `<a href="javascript://第 {page} 页" class="x-pager-next" title="转到：第 {page} 页" data-value="{page}">下一页 <i class="x-icon">⮞</i></a>`,
        nextDisabled: ``,
        ellipsis: ` ... `
    };
    __decorate([
        control_1.bind
    ], Pager.prototype, "total", void 0);
    __decorate([
        control_1.bind
    ], Pager.prototype, "currentPage", void 0);
    __decorate([
        control_1.bind
    ], Pager.prototype, "pageSize", void 0);
    __decorate([
        control_1.bind
    ], Pager.prototype, "minSize", void 0);
    __decorate([
        control_1.bind
    ], Pager.prototype, "maxSize", void 0);
    __decorate([
        control_1.bind
    ], Pager.prototype, "pageCount", null);
    __decorate([
        control_1.bind
    ], Pager.prototype, "showTotal", void 0);
    __decorate([
        control_1.bind
    ], Pager.prototype, "showSizeChanger", void 0);
    __decorate([
        control_1.bind
    ], Pager.prototype, "showQuickJumper", void 0);
    exports.Pager = Pager;
    exports.default = Pager;
});
// /**
//  * 生成包含指定分页信息的分页器 HTML。
//  * @param {Element} elem 渲染的父节点。
//  * @param {Number} totalCount 总的项数，这些项数将被分页。
//  * @param {Number} [pageSize=20] 每页的项数。
//  * @param {Number} [pagerCount=5] 显示的分页计数器个数，超过将不再显示。尽量传递奇数。
//  * @param {Number} [currentPage=1] 当前的页码，页数从 1 开始。
//  * @param {Function / String} [callback] 点击分页后的回调函数或生成的链接个数。其中 {page} 表示当前的页码。{pageSize} 表示每页的项数。
//  * @param {String} [href="?size={pageSize}&page={page}"] 生成的链接格式。其中 {page} 表示当前的页码。{pageSize} 表示每页的项数。
//  */
// function initPager(elem, totalCount, pageSize, pagerCount, currentPage, callback) {
//     var href;
//     if (!callback || callback.constructor !== Function) {
//         href = callback;
//         callback = 0;
//     }
//     elem.on('click', 'a', function (e) {
//         var hrefMatch = /page=(\d+)/.exec(this.href);
//         !hrefMatch || changePage(+hrefMatch[1]) !== true && e.preventDefault();
//     });//
//     changePage(currentPage || +(/page=(\d+)/.exec(location.href) || [0, 1])[1]);//
//     // 切换页码的逻辑。
//     function changePage(page) {
//         elem.innerHTML = generatePager(totalCount, pageSize, pagerCount, page, href);
//         return callback && callback(page, pageSize * (page - 1), Math.min(pageSize * page - 1, totalCount));
//     }//
// }//
// /**
//  * 存储本地化文案配置。
//  */
// export const locale = {
// };//
// /**
//  * 生成一段页码 HTML。
//  * @param pageCount 总页数。
//  * @param currentPage 当前页数。页码从 1 开始。
//  * @param href 生成的链接地址。其中 {page} 表示当前的页码。
//  * @param maxSize 最多显示的页数(不含上一页和下一页)。建议设置为奇数。
//  * @param minSize 首尾保留的页数。
//  */
// export default function generatePager(pageCount: number, currentPage = +(/[?&]page=(\d+)/.exec(location.href) || 0)[1] || 1, href = /([?&]page)=(\d+)/.test(location.search) ? location.search.replace(/([?&]page)=(\d+)/, '$1={page}') : (location.search ? location.search + '&' : '?') + 'page={page}', maxSize = 9, minSize = 2) {
// }//
// /**
//  * 生成包含指定分页信息的分页器 HTML。
//  * @param elem 渲染的父节点。
//  * @param callback 点击分页后的回调函数或生成的链接个数。其中 {page} 表示当前的页码。{pageSize} 表示每页的项数。
//  * @param pageCount 总页数。
//  * @param currentPage 当前页数。页码从 1 开始。
//  * @param maxSize 最多显示的页数(不含上一页和下一页)。建议设置为奇数。
//  * @param minSize 首尾保留的页数。
//  */
// export function initPager(elem: HTMLElement, callback?: (page?: number) => boolean | void, pageCount?: number, currentPage = 1, maxSize?: number, minSize?: number) {
//     elem.onclick = e => {
//         const hrefMatch = /page=(\d+)/.exec((<HTMLAnchorElement>e.target).href);
//         if (hrefMatch) {
//             const page = +hrefMatch[1];
//             elem.innerHTML = generatePager(pageCount, page, undefined, maxSize, minSize);
//             if (callback && callback(page) !== true) {
//                 e.preventDefault();
//             }
//         }
//     };
//     elem.innerHTML = generatePager(pageCount, currentPage, undefined, maxSize, minSize);
// }//
//# sourceMappingURL=pager.js.map