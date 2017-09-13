define(["require", "exports", "uux/dom;", "ui/control", "typo/table/table.scss", "./dataGridView.scss"], function (require, exports, dom, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个数据表视图。
     */
    class DataGridView extends control_1.default {
        constructor() {
            // #region 表格主体
            super(...arguments);
            /**
             * 获取当前控件的模板。
             */
            this.tpl = `<table class="x-table"><thead><tr/></thead><tbody/></table>`;
        }
        /**
         * 当被子类重写时，负责初始化当前控件。
         */
        init() {
            const me = this;
            dom.on(this.header, "click", ">*", function (e) { me.onHeaderClick(this, e); });
            dom.on(this.body, "dblclick", ">tr", function (e) { me.onCellDblClick(this, e); });
        }
        onHeaderClick(header, e) {
            if (this.sortable !== false) {
                const sortColumnIndex = dom.index(header);
                if (this.sortColumnIndex === sortColumnIndex) {
                    this.sortDesc = !this.sortDesc;
                }
                else {
                    this.sortColumnIndex = sortColumnIndex;
                }
            }
        }
        onCellDblClick(row, e) {
            this.toggleEdit(row);
        }
        // #endregion
        // #region 表头和列
        /**
         * 获取表头。
         */
        get head() { return dom.first(this.elem, "thead"); }
        /**
         * 获取表头行。
         */
        get header() { return dom.last(this.head, "tr"); }
        /**
         * 获取列数。
         */
        get columnCount() { return this.header.cells.length; }
        /**
         * 获取所有列的信息。
         */
        get columns() {
            const result = [];
            const columnCount = this.columnCount;
            for (let i = 0; i < columnCount; i++) {
                result[i] = this.getColumn(i);
            }
            return result;
        }
        /**
         * 设置所有列的信息。
         */
        set columns(value) {
            this.spliceColumn(0, this.columnCount, ...value);
        }
        /**
         * 获取指定列的信息。
         * @param index 相关的列号。
         * @return 返回列信息。如果列不存在则返回 undefined。
         */
        getColumn(index) {
            const cell = this.header.cells[index];
            if (cell) {
                return cell.data || (cell.data = {
                    name: dom.getHtml(cell),
                    title: cell.title || dom.getText(cell),
                    hidden: dom.isHidden(cell)
                });
            }
        }
        /**
         * 设置指定列的信息。
         * @param index 相关的列号。如果列超出索引则自动追加。
         * @param value 相关的列信息。设置为 null 表示删除。
         */
        setColumn(index, value) {
            this.spliceColumn(index, 1, value);
        }
        /**
         * 插入一个列。
         * @param index 插入的列号。
         * @param value 相关的列信息。
         */
        insertColumn(index, value) {
            this.spliceColumn(index, 0, value);
        }
        /**
         * 在末尾添加一个列。
         * @param value 相关的列信息。
         */
        addColumn(value) {
            this.insertColumn(this.columnCount, value);
        }
        /**
         * 移除指定的列。
         * @param index 移除的列号。
         */
        removeColumn(index) {
            this.spliceColumn(index, 1);
        }
        /**
         * 交换两个列。
         * @param x 交换的第一个列。
         * @param y 交换的第二个列。
         */
        swapColumn(x, y) {
            console.assert(x >= 0 && x < this.columnCount);
            console.assert(y >= 0 && y < this.columnCount);
            if (x === y) {
                return;
            }
            if (x > y) {
                const t = x;
                x = y;
                y = t;
            }
            const header = this.header;
            const rows = (control_1.VNode.create(HTMLTableElement, null,
                "this.elem).rows; for (let i = 0, row: HTMLTableRowElement; row = rows[i]; i++) ",
            ,
                " cellX = row.cells[x]; dom.before(cellX, row.cells[y]); dom.after(row.cells[y], cellX); } } /** * \u65B0\u589E\u6216\u5220\u9664\u5217\u4FE1\u606F\u3002 * @param index \u65B0\u589E\u6216\u5220\u9664\u7684\u4F4D\u7F6E\u3002 * @param removeCount \u5220\u9664\u7684\u5217\u6570\u3002 * @param inserts \u63D2\u5165\u7684\u5217\u3002 */ spliceColumn(index: number, removeCount: number, ...inserts: ColumnInfo",
                control_1.VNode.create("any", null,
                    "[]) ",
                    console.assert(index >= 0 && index <= this.columnCount),
                    "console.assert(removeCount >= 0 && removeCount ",
                    control_1.VNode.create("", null),
                    " this.columnCount); const header = this.header; const rows = (",
                    control_1.VNode.create(HTMLTableElement, null,
                        "this.elem).rows; let needRefilter: boolean; let needResort: boolean; let i = 0; // \u66F4\u65B0\u3002 for (const updateCount = Math.min(removeCount, inserts.length); i ",
                        control_1.VNode.create("updateCount", null),
                        " i++) ",
                    ,
                        " columnIndex = index + i; const oldColumn = this.getColumn(columnIndex); const newColumn = inserts[i]; const headerCell: DataGridHeaderCell = header.cells[columnIndex]; if (newColumn.name) ",
                        dom.setHtml(headerCell, newColumn.name),
                        "} if (newColumn.name || newColumn.title) ",
                        headerCell.title = newColumn.title || dom.getText(headerCell),
                        "} if (newColumn.hidden != undefined || newColumn.format) ",
                    ,
                        " (let i = 0, row: HTMLTableRowElement; row = rows[i]; i++) ",
                    ,
                        " cell = row.cells[columnIndex]; if (cell) ",
                    ,
                        " (newColumn.hidden != undefined) ",
                        dom.toggle(cell, "width", null, this.duration, null, !newColumn.hidden),
                        "} if (row !== header && newColumn.format) ",
                        this.setDataOf(cell, this.getDataOf(cell, oldColumn), newColumn),
                        "} } } } if (newColumn.filter !== oldColumn.filter || newColumn.parse !== oldColumn.parse && (newColumn.filter || oldColumn.filter)) ",
                        needRefilter = true,
                        "} if (columnIndex === this.sortColumnIndex && (newColumn.sort !== oldColumn.sort || newColumn.parse !== oldColumn.parse)) ",
                        needResort = true,
                        "} headerCell.data = Object.assign(oldColumn, newColumn); } // \u65B0\u589E\u3002 for (; i ",
                        control_1.VNode.create(inserts.length, null),
                        " i++) ",
                    ,
                        " columnIndex = index + i; const newColumn = Object.assign(",
                        ", inserts[i]); for (let i = 0, row: HTMLTableRowElement; row = rows[i]; i++) ",
                    ,
                        " html = row.parentNode.nodeName === \"THEAD\" ? \"",
                        control_1.VNode.create("th", null),
                        "\" : \"",
                        control_1.VNode.create("td", null),
                        "\"; const oldCell = ",
                        control_1.VNode.create(DataGridCell, null,
                            "row.cells[columnIndex]; let newCell: typeof oldCell; if (oldCell) ",
                            newCell = control_1.VNode.create(DataGridCell, null,
                                "dom.before(oldCell, html); } else ",
                            ,
                                " (!(newCell = row.cells[columnIndex])) ",
                                dom.append(row, html),
                                "} } if (newColumn.hidden) ",
                                dom.hide(newCell),
                                "} if (row === header) ",
                            ,
                                " (newColumn.name) ",
                                dom.setHtml(newCell, newColumn.name),
                                "} if (newColumn.name || newColumn.title) ",
                                newCell.title = newColumn.title || dom.getText(newCell),
                                "} (",
                                control_1.VNode.create(DataGridHeaderCell, null,
                                    "newCell).data = newColumn; } else ",
                                ,
                                    " (newColumn.filter && newColumn.filter(this.getDataOf(newCell, newColumn), newCell) === false) ",
                                    dom.hide(row),
                                    "} if (this.getEditing(newCell)) ",
                                    this.setEditing(newCell, true, newColumn),
                                    "} } } } // \u5220\u9664\u3002 for (; i ",
                                    control_1.VNode.create("removeCount", null),
                                    " i++) ",
                                ,
                                    " columnIndex = index + i; for (let i = 0, row: HTMLTableRowElement; row = rows[i]; i++) ",
                                    dom.remove(row.cells[columnIndex]),
                                    "} if (this.getColumn(columnIndex).filter) ",
                                    needRefilter = true,
                                    "} } // \u91CD\u65B0\u8FC7\u6EE4\u3002 if (needRefilter) ",
                                ,
                                    " (let i = 0, row: HTMLTableRowElement; row = rows[i]; i++) ",
                                ,
                                    " (row !== header) ",
                                    let,
                                    " = true; for (let i = 0, cell: HTMLTableCellElement; cell = row.cells[i]; i++) ",
                                ,
                                    " column = this.getColumn(i); if (column.filter && column.filter(this.getDataOf(cell, column), cell) === false) ",
                                    show = false,
                                    "break; } } this.toggleRow(row, show); } } } // \u91CD\u65B0\u6392\u5E8F\u3002 if (needResort) ",
                                    this.sortByColumn(this.sortColumnIndex, this.sortDesc),
                                    "} this.emit(\"columnchange\", removeCount, inserts); } // #endregion // #region \u4E3B\u4F53\u6570\u636E /** * \u83B7\u53D6\u4E3B\u4F53\u90E8\u5206\u3002 */ get body() ",
                                ,
                                    " dom.first(this.elem, \"tbody\"); } /** * \u83B7\u53D6\u603B\u884C\u6570\u3002 */ get rowCount() ",
                                ,
                                    " this.rows.length; } /** * \u83B7\u53D6\u6240\u6709\u884C\u3002 */ get rows() ",
                                ,
                                    " dom.query",
                                    control_1.VNode.create(HTMLTableRowElement, null,
                                        "(\">tr\", this.body); } /** * \u8BBE\u7F6E\u6240\u6709\u884C\u3002 */ set rows(value) ",
                                        Array.prototype.forEach.call(this.rows, dom.remove),
                                        "if (value) ",
                                        Array.prototype.forEach.call(value, row => dom.append(this.body, row)),
                                        "} } /** * \u83B7\u53D6\u6307\u5B9A\u884C\u7684\u6570\u636E\u3002 * @param index \u76F8\u5173\u7684\u884C\u53F7\u3002 * @return \u8FD4\u56DE\u884C\u6570\u636E\u3002\u5982\u679C\u5217\u4E0D\u5B58\u5728\u5219\u8FD4\u56DE undefined\u3002 */ getRow",
                                        control_1.VNode.create(T, null,
                                            "(index: number) ",
                                        ,
                                            " row = this.rows[index]; if (row) ",
                                        ,
                                            " result = []; for (let i = 0, cell: DataGridCell; cell = row.cells[i]; i++) ",
                                            result.push(this.getDataOf(cell)),
                                            "} return result; } } /** * \u8BBE\u7F6E\u6307\u5B9A\u5217\u7684\u4FE1\u606F\u3002 * @param index \u76F8\u5173\u7684\u5217\u53F7\u3002\u5982\u679C\u5217\u8D85\u51FA\u7D22\u5F15\u5219\u81EA\u52A8\u8FFD\u52A0\u3002 * @param value \u76F8\u5173\u7684\u5217\u4FE1\u606F\u3002\u8BBE\u7F6E\u4E3A null \u8868\u793A\u5220\u9664\u3002 */ setRow(index: number, value: any[]) ",
                                            this.spliceRow(index, 1, value),
                                            "} /** * \u63D2\u5165\u4E00\u4E2A\u5217\u3002 * @param index \u63D2\u5165\u7684\u5217\u53F7\u3002 * @param value \u76F8\u5173\u7684\u5217\u4FE1\u606F\u3002 */ insertRow(index: number, value?: any[]) ",
                                            this.spliceRow(index, 0, value || []),
                                            "return this.rows[index]; } /** * \u5728\u672B\u5C3E\u6DFB\u52A0\u4E00\u4E2A\u5217\u3002 * @param value \u76F8\u5173\u7684\u5217\u4FE1\u606F\u3002 * @return \u8FD4\u56DE\u65B0\u589E\u7684\u884C\u53F7\u3002 */ addRow(value?: any[]) ",
                                        ,
                                            " this.insertRow(this.rowCount, value); } /** * \u79FB\u9664\u6307\u5B9A\u7684\u5217\u3002 * @param index \u79FB\u9664\u7684\u5217\u53F7\u3002 * @return \u8FD4\u56DE\u5220\u9664\u7684\u884C\u3002 */ removeRow(index: number) ",
                                        ,
                                            " row = this.rows[index]; this.spliceRow(index, 1); return row; } /** * \u65B0\u589E\u6216\u5220\u9664\u884C\u3002 * @param index \u65B0\u589E\u6216\u5220\u9664\u7684\u4F4D\u7F6E\u3002 * @param removeCount \u5220\u9664\u7684\u884C\u6570\u3002 * @param inserts \u63D2\u5165\u7684\u884C\u3002 */ spliceRow(index: number, removeCount: number, ...inserts: any[][]) ",
                                            console.assert(index >= 0 && index <= this.rowCount),
                                            "console.assert(removeCount >= 0 && removeCount ",
                                            control_1.VNode.create("", null),
                                            " this.rowCount); const rows = this.rows; const columnCount = this.columnCount; for (let i = 0; i ",
                                            control_1.VNode.create(inserts.length, null),
                                            " i++) ",
                                        ,
                                            " refRow = rows[index + i]; const row = refRow ? dom.before(refRow, \"",
                                            control_1.VNode.create("tr", null),
                                            "\") : dom.append(this.body, \"",
                                            control_1.VNode.create("tr", null),
                                            "\"); for (let j = 0; j ",
                                            control_1.VNode.create("columnCount", null),
                                            " j++) ",
                                        ,
                                            " cell = ",
                                            control_1.VNode.create(DataGridCell, null,
                                                "dom.append(row, \"",
                                                control_1.VNode.create("td", null),
                                                "\"); if (j ",
                                                control_1.VNode.create("inserts", null),
                                                "i].length) ",
                                                this.setDataOf(cell, inserts[i][j]),
                                                "} } } while (removeCount-- > 0) ",
                                                dom.remove(rows[index + removeCount]),
                                                "} this.emit(\"rowchange\", index, removeCount, inserts); } /** * \u5207\u6362\u662F\u5426\u663E\u793A\u6216\u9690\u85CF\u884C\u3002 * @param row \u76F8\u5173\u7684\u884C\u53F7\u3002 * @param value \u662F\u5426\u9690\u85CF\u3002 */ toggleRow(row: HTMLTableRowElement | number, value?: boolean) ",
                                            ,
                                                " (typeof row === \"number\") row = this.rows[row]; dom.toggle(row, \"height\", null, this.duration, null, value); for (let i = 0, cell: HTMLTableCellElement; cell = row.cells[i]; i++) ",
                                                dom.toggle(cell, "height", null, this.duration, null, value),
                                                "} } /** * \u663E\u793A\u884C\u3002 * @param row \u76F8\u5173\u7684\u884C\u53F7\u3002 * @param value \u662F\u5426\u9690\u85CF\u3002 */ showRow(row: HTMLTableRowElement | number, value?: boolean) ",
                                                this.toggleRow(row, true),
                                                "} /** * \u9690\u85CF\u884C\u3002 * @param row \u76F8\u5173\u7684\u884C\u53F7\u3002 * @param value \u662F\u5426\u9690\u85CF\u3002 */ hideRow(row: HTMLTableRowElement | number, value?: boolean) ",
                                                this.toggleRow(row, false),
                                                "} /** * \u8BBE\u7F6E\u5F53\u524D\u8868\u683C\u7684\u6570\u636E\u6E90\u3002 */ get data() ",
                                            ,
                                                " result: any[][] = []; const rowCount = this.rowCount; for (let i = 0; i ",
                                                control_1.VNode.create("rowCount", null),
                                                " i++) ",
                                                result.push(this.getRow(i)),
                                                "} return result; } /** * \u8BBE\u7F6E\u5F53\u524D\u8868\u683C\u7684\u6570\u636E\u6E90\u3002 */ set data(value) ",
                                                this.spliceRow(0, this.rowCount, ...(value || [])),
                                                "} /** * \u83B7\u53D6\u6307\u5B9A\u5355\u5143\u683C\u7684\u6570\u636E\u3002 * @param row \u76F8\u5173\u7684\u884C\u53F7\u3002 * @param column \u76F8\u5173\u7684\u5217\u53F7\u3002 * @return \u8FD4\u56DE\u7ED1\u5B9A\u7684\u503C\u3002\u5982\u679C\u5355\u5143\u683C\u4E0D\u5B58\u5728\u5219\u8FD4\u56DE undefined\u3002 */ getData(row: number, column: number) ",
                                            ,
                                                " rowElem = this.rows[row]; const cell = rowElem && rowElem.cells[column]; return cell && this.getDataOf(cell); } /** * \u83B7\u53D6\u6307\u5B9A\u5355\u5143\u683C\u7684\u6570\u636E\u3002\u5982\u679C\u5355\u5143\u683C\u4E0D\u5B58\u5728\u5219\u81EA\u52A8\u63D2\u5165\u3002 * @param row \u76F8\u5173\u7684\u884C\u53F7\u3002 * @param column \u76F8\u5173\u7684\u5217\u53F7\u3002 * @param value \u8981\u8BBE\u7F6E\u7684\u503C\u3002 */ setData(row: number, column: number, value: any) ",
                                                console.assert(row >= 0 && row < this.rowCount),
                                                "console.assert(column >= 0 && column ",
                                                control_1.VNode.create(this.rows, null),
                                                "row].cells.length); this.setDataOf(this.rows[row].cells[column], value); } /** * \u83B7\u53D6\u6307\u5B9A\u5355\u5143\u683C\u7684\u6570\u636E\u3002 * @param cell \u76F8\u5173\u7684\u5355\u5143\u683C\u3002 * @param column \u4F7F\u7528\u7684\u5217\u4FE1\u606F\u3002 * @return \u8FD4\u56DE\u7ED1\u5B9A\u7684\u503C\u3002 */ getDataOf(cell: DataGridCell, column?: ColumnInfo",
                                                control_1.VNode.create("any", null,
                                                    ") ",
                                                ,
                                                    " (cell.editor) ",
                                                ,
                                                    " cell.editor.value; } if (column === undefined) column = this.getColumn(cell.cellIndex); const html = dom.getHtml(cell); return column && column.parse ? column.parse(html, cell) : html; } /** * \u8BBE\u7F6E\u6307\u5B9A\u5355\u5143\u683C\u7684\u6570\u636E\u3002 * @param cell \u76F8\u5173\u7684\u5355\u5143\u683C\u3002 * @param value \u76F8\u5173\u7684\u6570\u636E\u3002 * @param column \u4F7F\u7528\u7684\u5217\u4FE1\u606F\u3002 */ setDataOf(cell: DataGridCell, value: any, column?: ColumnInfo",
                                                    control_1.VNode.create("any", null,
                                                        ") ",
                                                    ,
                                                        " (cell.editor) ",
                                                        cell.editor.value = value,
                                                        "return; } if (column === undefined) column = this.getColumn(cell.cellIndex); if (column && column.format) ",
                                                        value = column.format(value, cell),
                                                        "} if (value !== undefined) ",
                                                        dom.setHtml(cell, value),
                                                        "} } // #endregion // #region \u6392\u5E8F /** * \u83B7\u53D6\u5F53\u524D\u662F\u5426\u5141\u8BB8\u6392\u5E8F\u3002 */ sortable: boolean; /** * \u83B7\u53D6\u5F53\u524D\u6392\u5E8F\u7684\u5217\u3002 */ get sortColumn() ",
                                                    ,
                                                        " dom.find",
                                                        control_1.VNode.create(HTMLTableCellElement, null,
                                                            "(\">.x-table-sort\", this.header); } /** * \u83B7\u53D6\u5F53\u524D\u6392\u5E8F\u7684\u5217\u53F7\u3002 */ get sortColumnIndex() ",
                                                        ,
                                                            " sortColumn = this.sortColumn; return sortColumn ? sortColumn.cellIndex : -1; } /** * \u8BBE\u7F6E\u5F53\u524D\u6392\u5E8F\u7684\u5217\u53F7\u3002 */ set sortColumnIndex(value) ",
                                                            console.assert(value >= 0 && value < this.columnCount),
                                                            "if (this.sortable === false) ",
                                                        ,
                                                            "; } const column = this.getColumn(value); if (column && column.sortable === false) ",
                                                        ,
                                                            "; } const sortColumn = this.sortColumn; if (sortColumn) ",
                                                            dom.removeClass(sortColumn, "x-table-sort-desc"),
                                                            "dom.removeClass(sortColumn, \"x-table-sort\"); } dom.addClass(this.header.cells[value], \"x-table-sort\"); this.sortByColumn(value, false); } /** * \u83B7\u53D6\u5F53\u524D\u662F\u5426\u5012\u5E8F\u3002 */ get sortDesc() ",
                                                        ,
                                                            " sortColumn = this.sortColumn; return sortColumn && dom.match(sortColumn, \".x-table-sort-desc\"); } /** * \u8BBE\u7F6E\u5F53\u524D\u662F\u5426\u5012\u5E8F\u3002 */ set sortDesc(value) ",
                                                        ,
                                                            " sortColumn = this.sortColumn; if (sortColumn) ",
                                                            dom.toggleClass(sortColumn, "x-table-sort-desc", value),
                                                            "const columnIndex = dom.index(sortColumn); const column = this.getColumn(columnIndex); if (column && column.sortable === false) ",
                                                        ,
                                                            "; } this.sortByColumn(columnIndex, value); } } private sortByColumn(column: number, desc: boolean) ",
                                                        ,
                                                            " columnInfo = this.getColumn(column); this.sort((x, y) => ",
                                                        ,
                                                            " cellX = x.cells[column]; const cellY = y.cells[column]; const dataX = this.getDataOf(cellX); const dataY = this.getDataOf(cellY); const result = columnInfo && columnInfo.sort ? columnInfo.sort(dataX, dataY, cellX, cellY) : dataX ",
                                                            control_1.VNode.create("dataY", null),
                                                            " -1 : dataX > dataY ? 1 : 0; return desc ? -result : result; }); } /** * \u6839\u636E\u6307\u5B9A\u7684\u503C\u6392\u5E8F\u3002 * @param sorter \u7528\u4E8E\u6392\u5E8F\u7684\u51FD\u6570\u3002 */ sort(sorter?: (x: HTMLTableRowElement, y: HTMLTableRowElement) => number) ",
                                                        ,
                                                            " rows = Array.prototype.slice.call(this.rows); rows.sort(sorter); this.rows = rows; this.emit(\"sort\"); } // #endregion // #region \u9009\u4E2D\u6A21\u5F0F // #endregion // #region \u7F16\u8F91\u6A21\u5F0F /** * \u83B7\u53D6\u5F53\u524D\u662F\u5426\u5141\u8BB8\u7F16\u8F91\u3002 */ editable: boolean; /** * \u5224\u65AD\u67D0\u4E2A\u5355\u5143\u683C\u662F\u5426\u6B63\u5728\u7F16\u8F91\u3002 * @param cell \u76F8\u5173\u7684\u5355\u5143\u683C\u3002 */ getEditing(cell: HTMLTableCellElement) ",
                                                        ,
                                                            " !!(",
                                                            control_1.VNode.create(DataGridCell, null,
                                                                "cell).editor; } /** * \u8BBE\u7F6E\u67D0\u4E2A\u5355\u5143\u683C\u662F\u5426\u6B63\u5728\u7F16\u8F91\u3002 * @param cell \u76F8\u5173\u7684\u5355\u5143\u683C\u3002 * @param value \u53EF\u7F16\u8F91\u7684\u72B6\u6001\u3002 * @param column \u76F8\u5173\u7684\u5217\u4FE1\u606F\u3002 */ setEditing(cell: HTMLTableCellElement, value: boolean, column?: ColumnInfo",
                                                                control_1.VNode.create("any", null,
                                                                    ") ",
                                                                ,
                                                                    " (this.editable === false || (value !== false) === this.getEditing(cell)) ",
                                                                ,
                                                                    "; } if (!column) column = this.getColumn(cell.cellIndex); if (column && column.editable === false) ",
                                                                ,
                                                                    "; } if (value === false) ",
                                                                    dom.removeClass(cell, "x-table-edit"),
                                                                    "const value = (",
                                                                    control_1.VNode.create(DataGridCell, null,
                                                                        "cell).editor.value; dom.remove((",
                                                                        control_1.VNode.create(DataGridCell, null,
                                                                            "cell).editor.elem); delete (",
                                                                            control_1.VNode.create(DataGridCell, null,
                                                                                "cell).editor; this.setDataOf(cell, value); this.emit(\"endedit\", cell); } else ",
                                                                                dom.addClass(cell, "x-table-edit"),
                                                                                "const editor = this.getEditor(cell, column); if (editor) ",
                                                                                editor.value = this.getDataOf(cell, column),
                                                                                "dom.setHtml(cell, \"\"); editor.appendTo(cell); (",
                                                                                control_1.VNode.create(DataGridCell, null,
                                                                                    "cell).editor = editor; } this.emit(\"beginedit\", cell); } } /** * \u5F53\u88AB\u5B50\u7C7B\u91CD\u5199\u65F6\u8D1F\u8D23\u8FD4\u56DE\u6307\u5B9A\u5355\u5143\u683C\u7684\u7F16\u8F91\u5668\u3002 * @param cell \u76F8\u5173\u7684\u5355\u5143\u683C\u3002 * @param column \u76F8\u5173\u7684\u5217\u4FE1\u606F\u3002 */ protected getEditor(cell: HTMLTableCellElement, column: ColumnInfo",
                                                                                    control_1.VNode.create("any", null,
                                                                                        ") ",
                                                                                    ,
                                                                                        " (column && column.editor) ",
                                                                                    ,
                                                                                        " column.editor(cell); } return new TextBox(); } // /** //  * \u83B7\u53D6\u6B63\u5728\u8FDB\u884C\u7F16\u8F91\u6A21\u5F0F\u7684\u884C\u3002 //  */ // get editRow() ",
                                                                                        //     return dom.find<HTMLTableRowElement>(">.x-table-edit", this.body);
                                                                                        // }
                                                                                        /**
                                                                                         * 进入编辑模式。
                                                                                         * @param row 相关的行号。如果未提供则所有行进入编辑模式。
                                                                                         * @param column 相关的列号。如果未提供则整行进入编辑模式。
                                                                                         */
                                                                                        beginEdit(row ?  : number | HTMLTableRowElement, column ?  : number),
                                                                                        "this.toggleEdit(row, column, true); } /** * \u9000\u51FA\u7F16\u8F91\u6A21\u5F0F\u3002 * @param row \u76F8\u5173\u7684\u884C\u53F7\u3002\u5982\u679C\u672A\u63D0\u4F9B\u5219\u6240\u6709\u884C\u9000\u51FA\u7F16\u8F91\u6A21\u5F0F\u3002 * @param column \u76F8\u5173\u7684\u5217\u53F7\u3002\u5982\u679C\u672A\u63D0\u4F9B\u5219\u6574\u884C\u9000\u51FA\u7F16\u8F91\u6A21\u5F0F\u3002 */ endEdit(row?: number | HTMLTableRowElement, column?: number) ",
                                                                                        this.toggleEdit(row, column, false),
                                                                                        "} /** * \u5207\u6362\u7F16\u8F91\u6A21\u5F0F\u3002 * @param row \u76F8\u5173\u7684\u884C\u53F7\u3002\u5982\u679C\u672A\u63D0\u4F9B\u5219\u6240\u6709\u884C\u9000\u51FA\u7F16\u8F91\u6A21\u5F0F\u3002 * @param column \u76F8\u5173\u7684\u5217\u53F7\u3002\u5982\u679C\u672A\u63D0\u4F9B\u5219\u6574\u884C\u9000\u51FA\u7F16\u8F91\u6A21\u5F0F\u3002 * @param value \u8BBE\u7F6E\u6A21\u5F0F\u3002 */ toggleEdit(row?: number | HTMLTableRowElement, column?: number, value?: boolean) ",
                                                                                    ,
                                                                                        " (row === undefined) ",
                                                                                        dom.toggleClass(this.elem, "x-table-edit", value),
                                                                                        "const rowCount = this.rowCount; for (let i = 0; i ",
                                                                                        control_1.VNode.create("rowCount", null),
                                                                                        " i++) ",
                                                                                        this.toggleEdit(i, undefined, value),
                                                                                        "} } else ",
                                                                                    ,
                                                                                        " (typeof row === \"number\") ",
                                                                                        console.assert(row >= 0 && row < this.rowCount),
                                                                                        "row = this.rows[row]; } if (column === undefined) ",
                                                                                        dom.toggleClass(row, "x-table-edit", value),
                                                                                        "const cellCount = row.cells.length; for (let i = 0; i ",
                                                                                        control_1.VNode.create("cellCount", null),
                                                                                        " i++) ",
                                                                                        this.toggleEdit(row, i, value),
                                                                                        "} } else ",
                                                                                        console.assert(column >= 0 && column < row.cells.length),
                                                                                        "const cell = row.cells[column]; this.setEditing(cell, value === undefined ? !this.getEditing(cell) : value); } } } /** * \u5224\u65AD\u662F\u5426\u6B63\u5728\u8FDB\u884C\u7F16\u8F91\u6A21\u5F0F\u3002 */ isEditing(row?: number, column?: number) ",
                                                                                    ,
                                                                                        " (row === undefined) return dom.match(this.elem, \".x-table-edit\"); console.assert(row >= 0 && row ",
                                                                                        control_1.VNode.create(this.rowCount, null),
                                                                                        "; if (column === undefined) return dom.match(this.rows[row], \".x-table-edit\"); console.assert(column >= 0 && column ",
                                                                                        control_1.VNode.create(this.rows, null),
                                                                                        "row].cells.length); return this.getEditing(this.rows[row].cells[column]); } // #endregion } /** * \u8868\u793A\u6570\u636E\u8868\u5934\u7684\u4E00\u4E2A\u5355\u5143\u683C\u3002 */ interface DataGridHeaderCell extends HTMLTableDataCellElement, HTMLTableHeaderCellElement ",
                                                                                        /**
                                                                                         * 当前列的数据。
                                                                                         */
                                                                                        data ?  : ColumnInfo(),
                                                                                        "} /** * \u8868\u793A\u6570\u636E\u8868\u7684\u4E00\u4E2A\u5355\u5143\u683C\u3002 */ interface DataGridCell extends HTMLTableDataCellElement, HTMLTableHeaderCellElement ",
                                                                                        /**
                                                                                         * 和当前单元格绑定的数据。
                                                                                         */
                                                                                        editor ?  : DataGridCellEditor,
                                                                                        "} /** * \u8868\u793A\u4E00\u4E2A\u5355\u5143\u683C\u7F16\u8F91\u5668\u3002 */ export interface DataGridCellEditor ",
                                                                                        /**
                                                                                         * 获取当前编辑器的值。
                                                                                         */
                                                                                        value,
                                                                                        " any; /** * \u83B7\u53D6\u5F53\u524D\u7F16\u8F91\u5668\u7684\u5143\u7D20\u3002 */ elem: HTMLElement; /** * \u5C06\u5F53\u524D\u7F16\u8F91\u5668\u6DFB\u52A0\u5230\u6307\u5B9A\u7684\u5BB9\u5668\u3002 */ appendTo(parent: HTMLElement); /** * \u7ED1\u5B9A changing \u4E8B\u4EF6\u3002 */ on(event: \"changing\", handler: Function); } /** * \u8868\u793A\u4E00\u4E2A\u5217\u4FE1\u606F\u3002 */ export interface ColumnInfo",
                                                                                        control_1.VNode.create(T, null,
                                                                                            " ",
                                                                                            /**
                                                                                             * 列名。
                                                                                             */
                                                                                            name ?  : string,
                                                                                            "/** * \u5217\u6807\u9898\u3002 */ title?: string; /** * \u662F\u5426\u9690\u85CF\u5217\u3002 */ hidden?: boolean; /** * \u662F\u5426\u5141\u8BB8\u57FA\u4E8E\u5F53\u524D\u5217\u6392\u5E8F\u3002 */ sortable?: boolean; /** * \u662F\u5426\u5141\u8BB8\u7F16\u8F91\u5F53\u524D\u5217\u3002 */ editable?: boolean; /** * \u7528\u4E8E\u5C06\u5B57\u7B26\u4E32\u8F6C\u4E3A\u5F53\u524D\u5217\u7684\u51FD\u6570\u3002 */ parse?: (value: string, cell: HTMLTableCellElement) => T; /** * \u7528\u4E8E\u683C\u5F0F\u5316\u5F53\u524D\u5217\u4E3A\u5B57\u7B26\u4E32\u7684\u51FD\u6570\u3002 */ format?: (value: T, cell: HTMLTableCellElement) => string; /** * \u7528\u4E8E\u7B5B\u9009\u5F53\u524D\u5217\u7684\u51FD\u6570\u3002 */ filter?: (value: T, cell: HTMLTableCellElement) => boolean; /** * \u7528\u4E8E\u6392\u5E8F\u5F53\u524D\u5217\u7684\u51FD\u6570\u3002 */ sort?: (x: T, y: T, cellX: HTMLTableCellElement, cellY: HTMLTableCellElement) => number; /** * \u5F53\u524D\u5217\u5728\u7F16\u8F91\u6A21\u5F0F\u7684\u9009\u62E9\u5668\u3002 */ editor?: ((cell: HTMLTableCellElement) => DataGridCellEditor); /** * \u7ED1\u5B9A\u7684\u952E\u540D\u3002 */ key?: string; }")))))))))))))))))))));
        }
    }
    exports.default = DataGridView;
});
//# sourceMappingURL=dataGridView.js.map