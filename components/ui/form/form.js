var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ui/control", "ui/checkBox", "ui/input", "ux/scroll", "./form.scss"], function (require, exports, control_1, checkBox_1, input_1, scroll_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个表单。
     */
    class Form extends control_1.default {
        constructor() {
            super(...arguments);
            /**
             * 处理表单提交事件。
             */
            this.handleSubmit = (e) => {
                if (this.willValidate) {
                    const result = this.reportValidity();
                    if (result instanceof Promise) {
                        // 立即终止当前表单提交。
                        // 等待验证成功后重新提交。
                        e.preventDefault();
                        result.then(result => {
                            if (!result.valid) {
                                return;
                            }
                            const noValidate = this.noValidate;
                            this.noValidate = true;
                            try {
                                this.submit();
                            }
                            finally {
                                this.noValidate = noValidate;
                            }
                        });
                        return;
                    }
                    if (!result.valid) {
                        e.preventDefault();
                        return;
                    }
                }
                // 异步提交。
                if (this.async) {
                    e.preventDefault();
                    // TODO: 异步提交。
                    throw ("异步提交功能正在开发,请不要使用");
                }
                else {
                    this.onSubmit && this.onSubmit(e);
                }
            };
            /**
             * 处理表单重置事件。
             */
            this.handleReset = (e) => {
                this.inputs.forEach(input => input.reset());
            };
        }
        render() {
            return control_1.VNode.create("form", { class: "x-form", onSubmit: this.handleSubmit, onReset: this.handleReset });
        }
        /**
         * 最终提交的数据。
         */
        get value() {
            return this.getValue({ hidden: true });
        }
        set value(value) {
            this.data = Object.assign({}, value);
            for (const input of this.inputs) {
                if (input.name in value) {
                    delete this.data[input.name];
                    if (input instanceof checkBox_1.CheckBoxBase) {
                        input.value = value[input.name] === input.value || Array.isArray(value[input.name]) && value[input.name].indexOf(input.value) >= 0;
                    }
                    else {
                        input.value = value[input.name];
                    }
                }
            }
        }
        getValue({ hidden = false, disabled = false }) {
            const result = Object.assign({}, this.data);
            for (const input of this.inputs) {
                if (input.name) {
                    if (disabled == false && input.disabled) {
                        continue;
                    }
                    if (hidden == false && input.hidden) {
                        continue;
                    }
                    if (input instanceof checkBox_1.CheckBoxBase) {
                        if (input.value) {
                            if (Array.isArray(result[input.name])) {
                                result[input.name].push(input.value);
                            }
                            else if (input.name in result) {
                                result[input.name] = [result[input.name], input.value];
                            }
                            else {
                                result[input.name] = input.value;
                            }
                        }
                    }
                    else {
                        result[input.name] = input.value;
                    }
                }
            }
            return result;
        }
        /**
         * 是否禁用。禁用后数据不会被提交到服务端。
         */
        get disabled() {
            return (this.inputs[0] || 0).disabled;
        }
        set disabled(value) {
            this.inputs.forEach(input => { input.disabled = value; });
        }
        /**
         * 是否只读。
         */
        get readOnly() {
            return (this.inputs[0] || 0).readOnly;
        }
        set readOnly(value) {
            this.inputs.forEach(input => { input.readOnly = value; });
        }
        /**
         * 当前表单内的所有输入域。
         */
        get inputs() {
            return this.query("*").filter(ctrl => ctrl instanceof input_1.default);
        }
        /**
         * 判断当前表单是否需要验证。
         */
        get willValidate() {
            return !this.noValidate && !this.disabled;
        }
        /**
         * 提交当前表单。
         */
        submit() {
            this.elem.submit();
        }
        /**
         * 重置当前表单。
         */
        reset() {
            this.elem.reset();
        }
        /**
         * 验证当前表单内的所有输入域。
         * @return 返回验证后的出错的字段列表。如果返回空数组说明验证成功。如果正在执行异步验证则返回一个确认对象。
         */
        checkValidity() {
            return this._checkValidity();
        }
        /**
         * 向用户报告验证结果。
         */
        reportValidity() {
            return this._checkValidity(true);
        }
        _checkValidity(report) {
            const result = {
                valid: true,
                inputs: [],
                results: []
            };
            const promises = [];
            let firstError;
            for (const input of this.inputs) {
                if (input.hidden) {
                    continue;
                }
                if (!input.willValidate) {
                    continue;
                }
                const inputResult = report ? input.reportValidity() : input.checkValidity();
                if (inputResult instanceof Promise) {
                    promises.push(inputResult.then(inputResult => {
                        if (!inputResult.valid) {
                            result.valid = false;
                        }
                        result.inputs.push(input);
                        result.results.push(inputResult);
                    }));
                }
                else {
                    if (!inputResult.valid) {
                        result.valid = false;
                        firstError = firstError || input;
                    }
                    result.inputs.push(input);
                    result.results.push(inputResult);
                }
            }
            if (this.onValidate) {
                const newResult = this.onValidate(result);
                if (newResult instanceof Promise) {
                    promises.push(newResult.then(newResult => {
                        if (newResult === false) {
                            result.valid = newResult;
                        }
                    }));
                }
                else if (newResult === false) {
                    result.valid = newResult;
                }
            }
            if (promises.length) {
                return Promise.all(promises).then(() => result);
            }
            if (report && firstError) {
                scroll_1.scrollIntoViewIfNeeded(firstError.elem, true);
            }
            return result;
        }
    }
    __decorate([
        control_1.bind("")
    ], Form.prototype, "body", void 0);
    __decorate([
        control_1.bind("", "action")
    ], Form.prototype, "action", void 0);
    __decorate([
        control_1.bind("", "method")
    ], Form.prototype, "method", void 0);
    exports.default = Form;
});
//# sourceMappingURL=form.js.map