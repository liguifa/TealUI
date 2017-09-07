define(["require", "exports", "./pager.less"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 存储本地化文案配置。
     */
    exports.locale = {
        item: '<a href="{href}" title="转到：第 {page} 页">{page}</a>',
        itemDisabled: '<a class="x-pager-actived">{page}</a>',
        // prev: '<a href="{href}"{class} title="上一页：第{page}页"><span class="x-icon">«</span></a>',
        // next: '<a href="{href}"{class} title="下一页：第{page}页"><span class="x-icon">»</span></a>'
        prev: '<a href="{href}" class="x-pager-prev" title="上一页：第 {page} 页"><span class="x-icon">☪</span>上一页</a>',
        next: '<a href="{href}" class="x-pager-next" title="下一页：第 {page} 页">下一页 <span class="x-icon">↠</span></a>',
        prevDisabled: '',
        nextDisabled: '',
        ellipsis: ' ... '
    };
    /**
     * 生成一段页码 HTML。
     * @param pageCount 总页数。
     * @param currentPage 当前页数。页码从 1 开始。
     * @param href 生成的链接地址。其中 {page} 表示当前的页码。
     * @param maxWidth 最多显示的页数(不含上一页和下一页)。建议设置为奇数。
     * @param minWidth 首尾保留的页数。
     */
    function generatePager(pageCount, currentPage = +(/[?&]page=(\d+)/.exec(location.href) || 0)[1] || 1, href = /([?&]page)=(\d+)/.test(location.search) ? location.search.replace(/([?&]page)=(\d+)/, '$1={page}') : (location.search ? location.search + '&' : '?') + 'page={page}', maxWidth = 9, minWidth = 2) {
        console.assert(currentPage > 0 && currentPage <= pageCount);
        console.assert(minWidth >= 0);
        console.assert(maxWidth > minWidth * 2);
        let result = "";
        function link(tpl, page) {
            result += tpl.replace('{href}', href).replace(/{page}/g, page);
        }
        let start = Math.max(currentPage - Math.floor((maxWidth - 1) / 2), 1);
        let end = start + maxWidth - 1;
        if (end > pageCount) {
            start = Math.max(start - end + pageCount, 1);
            end = pageCount;
        }
        let leftEllipsis = false;
        let rightEllipsis = false;
        if (minWidth > 0) {
            if (start > 1) {
                leftEllipsis = true;
                start += minWidth;
            }
            if (end < pageCount) {
                rightEllipsis = true;
                end -= minWidth;
            }
        }
        link(currentPage <= 1 ? exports.locale.prevDisabled : exports.locale.prev, currentPage - 1);
        if (leftEllipsis) {
            for (let p = 1; p <= minWidth; p++) {
                link(exports.locale.item, p);
            }
            result += " &nbsp;...";
        }
        for (let p = start; p <= end; p++) {
            link(p === currentPage ? exports.locale.itemDisabled : exports.locale.item, p);
        }
        if (rightEllipsis) {
            result += " &nbsp;...";
            for (let p = pageCount - minWidth + 1; p <= pageCount; p++) {
                link(exports.locale.item, p);
            }
        }
        link(currentPage >= pageCount ? exports.locale.nextDisabled : exports.locale.next, currentPage + 1);
        return result;
    }
    exports.default = generatePager;
    /**
     * 生成包含指定分页信息的分页器 HTML。
     * @param elem 渲染的父节点。
     * @param callback 点击分页后的回调函数或生成的链接个数。其中 {page} 表示当前的页码。{pageSize} 表示每页的项数。
     * @param pageCount 总页数。
     * @param currentPage 当前页数。页码从 1 开始。
     * @param maxWidth 最多显示的页数(不含上一页和下一页)。建议设置为奇数。
     * @param minWidth 首尾保留的页数。
     */
    function initPager(elem, callback, pageCount, currentPage = 1, maxWidth, minWidth) {
        elem.onclick = e => {
            const hrefMatch = /page=(\d+)/.exec(e.target.href);
            if (hrefMatch) {
                const page = +hrefMatch[1];
                elem.innerHTML = generatePager(pageCount, page, undefined, maxWidth, minWidth);
                if (callback && callback(page) !== true) {
                    e.preventDefault();
                }
            }
        };
        elem.innerHTML = generatePager(pageCount, currentPage, undefined, maxWidth, minWidth);
    }
    exports.initPager = initPager;
});
//# sourceMappingURL=pager-simple.js.map