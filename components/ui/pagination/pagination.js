var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ui/control", "ui/listBox", "ui/comboBox", "ui/textBox", "./pagination.scss"], function (require, exports, control_1, listBox_1, comboBox_1, textBox_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个分页。
     */
    class Pagination extends control_1.default {
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
            this.maxSize = 7;
            this.showTotal = true;
            this.showSizeChanger = true;
            this.showQuickJumper = true;
            this.handleClick = (e) => {
                const page = e.target.getAttribute("data-value");
                if (page) {
                    this.currentPage = +page;
                    this.onSelect && this.onSelect(this.currentPage, this.pageSize);
                }
            };
            this.handleQuickJumperClick = (e) => {
                e.preventDefault();
                const input = this.find(".x-pagination-quickjumper");
                const result = input.checkValidity();
                if (result.valid) {
                    input.setCustomValidity({ status: null });
                    this.currentPage = +input.value;
                    this.onSelect && this.onSelect(this.currentPage, this.pageSize);
                }
                else {
                    input.setCustomValidity(result);
                }
            };
            this.handleSizeChange = (e) => {
                const input = this.find(".x-pagination-sizechanger");
                // TODO: 添加字段验证。
                this.pageSize = +input.value;
                this.onSelect && this.onSelect(this.currentPage, this.pageSize);
            };
        }
        /**
         * 总页数。
         */
        get pageCount() {
            return this.total ? Math.ceil(this.total / this.pageSize) : 1;
        }
        set pageCount(value) {
            this.total = this.pageSize * value;
            this.invalidate();
        }
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
            append(this.currentPage <= 1 ? Pagination.locale.prevDisabled : Pagination.locale.prev, this.currentPage - 1);
            if (this.maxSize > 0) {
                if (leftEllipsis) {
                    for (let p = 1; p <= this.minSize; p++) {
                        append(Pagination.locale.item, p);
                    }
                    html += Pagination.locale.ellipsis;
                }
                for (let p = start; p <= end; p++) {
                    append(p === this.currentPage ? Pagination.locale.itemDisabled : Pagination.locale.item, p);
                }
                if (rightEllipsis) {
                    html += Pagination.locale.ellipsis;
                    for (let p = this.pageCount - this.minSize + 1; p <= this.pageCount; p++) {
                        append(Pagination.locale.item, p);
                    }
                }
            }
            append(this.currentPage >= this.pageCount ? Pagination.locale.nextDisabled : Pagination.locale.next, this.currentPage + 1);
            return control_1.VNode.create("nav", { class: "x-pagination" },
                control_1.VNode.create("div", { class: "x-pagination-header" },
                    this.showSizeChanger ? ["每页条数：",
                        control_1.VNode.create(comboBox_1.default, { class: "x-pagination-sizechanger", value: this.pageSize.toString(), onChange: this.handleSizeChange },
                            control_1.VNode.create(listBox_1.ListItem, null, "10"),
                            control_1.VNode.create(listBox_1.ListItem, null, "20"),
                            control_1.VNode.create(listBox_1.ListItem, null, "30"))] : null,
                    this.showTotal ? ` 共 ${this.total || 0} 条` : ""),
                this.showQuickJumper ? control_1.VNode.create("form", { class: "x-pagination-footer", onSubmit: this.handleQuickJumperClick },
                    "\u8DF3\u81F3\uFF1A",
                    control_1.VNode.create(textBox_1.default, { type: "number", class: "x-textbox x-pagination-quickjumper", value: this.currentPage.toString(), noValidate: true, min: 1, max: this.pageCount }),
                    " \u9875 \u00A0",
                    control_1.VNode.create("input", { type: "submit", class: "x-button x-page-goto-page", value: "跳转", style: "min-width: 60px;" })) : null,
                control_1.VNode.create("div", { class: "x-pagination-body", innerHTML: html, onClick: this.handleClick }));
        }
    }
    /**
     * 存储本地化文案配置。
     */
    Pagination.locale = {
        item: `<a href="javascript://第 {page} 页" title="转到：第 {page} 页" data-value="{page}">{page}</a>`,
        itemDisabled: `<a class="x-pagination-active">{page}</a>`,
        prev: `<a href="javascript://第 {page} 页" class="x-pagination-prev" title="转到：第 {page} 页" data-value="{page}"><i class="x-icon">⮜</i>上一页</a>`,
        prevDisabled: ``,
        next: `<a href="javascript://第 {page} 页" class="x-pagination-next" title="转到：第 {page} 页" data-value="{page}">下一页 <i class="x-icon">⮞</i></a>`,
        nextDisabled: ``,
        ellipsis: ` ... `
    };
    __decorate([
        control_1.bind
    ], Pagination.prototype, "total", void 0);
    __decorate([
        control_1.bind
    ], Pagination.prototype, "currentPage", void 0);
    __decorate([
        control_1.bind
    ], Pagination.prototype, "pageSize", void 0);
    __decorate([
        control_1.bind
    ], Pagination.prototype, "minSize", void 0);
    __decorate([
        control_1.bind
    ], Pagination.prototype, "maxSize", void 0);
    __decorate([
        control_1.bind
    ], Pagination.prototype, "showTotal", void 0);
    __decorate([
        control_1.bind
    ], Pagination.prototype, "showSizeChanger", void 0);
    __decorate([
        control_1.bind
    ], Pagination.prototype, "showQuickJumper", void 0);
    exports.default = Pagination;
});
// /**
//  * 生成包含指定分页信息的分页器 HTML。
//  * @param {Element} elem 渲染的父节点。
//  * @param {Number} totalCount 总的项数，这些项数将被分页。
//  * @param {Number} [pageSize=20] 每页的项数。
//  * @param {Number} [PaginationCount=5] 显示的分页计数器个数，超过将不再显示。尽量传递奇数。
//  * @param {Number} [currentPage=1] 当前的页码，页数从 1 开始。
//  * @param {Function / String} [callback] 点击分页后的回调函数或生成的链接个数。其中 {page} 表示当前的页码。{pageSize} 表示每页的项数。
//  * @param {String} [href="?size={pageSize}&page={page}"] 生成的链接格式。其中 {page} 表示当前的页码。{pageSize} 表示每页的项数。
//  */
// function initPagination(elem, totalCount, pageSize, PaginationCount, currentPage, callback) {
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
//         elem.innerHTML = generatePagination(totalCount, pageSize, PaginationCount, page, href);
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
// export default function generatePagination(pageCount: number, currentPage = +(/[?&]page=(\d+)/.exec(location.href) || 0)[1] || 1, href = /([?&]page)=(\d+)/.test(location.search) ? location.search.replace(/([?&]page)=(\d+)/, '$1={page}') : (location.search ? location.search + '&' : '?') + 'page={page}', maxSize = 9, minSize = 2) {
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
// export function initPagination(elem: HTMLElement, callback?: (page?: number) => boolean | void, pageCount?: number, currentPage = 1, maxSize?: number, minSize?: number) {
//     elem.onclick = e => {
//         const hrefMatch = /page=(\d+)/.exec((<HTMLAnchorElement>e.target).href);
//         if (hrefMatch) {
//             const page = +hrefMatch[1];
//             elem.innerHTML = generatePagination(pageCount, page, undefined, maxSize, minSize);
//             if (callback && callback(page) !== true) {
//                 e.preventDefault();
//             }
//         }
//     };
//     elem.innerHTML = generatePagination(pageCount, currentPage, undefined, maxSize, minSize);
// }//
//# sourceMappingURL=pagination.js.map