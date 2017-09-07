var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "control", "input/input", "./form.scss"], function (require, exports, control_1, input_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个表单。
     */
    class Form extends control_1.Control {
        constructor() {
            super(...arguments);
            this.handleSubmit = (e) => {
                // 验证表单内所有字段。
                if (!this.noValidate) {
                    const result = this.reportValidity();
                    if (result instanceof Promise) {
                        // 立即终止当前表单提交。
                        // 等待验证成功后重新提交。
                        e.preventDefault();
                        result.then(result => {
                            if (result.length) {
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
                    if (result.length) {
                        e.preventDefault();
                        return;
                    }
                }
                // 验证通过开始提交。
                if (this.onBeforeSubmit && this.onBeforeSubmit(e) === false) {
                    e.preventDefault();
                    return;
                }
                // 异步提交。
                if (this.async) {
                    e.preventDefault();
                }
                else {
                    this.onSubmit && this.onSubmit(e);
                }
            };
        }
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("form", { class: "x-form", onSubmit: this.handleSubmit });
        }
        submit() {
            this.elem.submit();
        }
        reset() {
            this.elem.reset();
        }
        /**
         * 当前表单内的所有输入控件。
         */
        get inputs() {
            const result = [];
            const elems = this.elem.getElementsByTagName("*");
            for (let i = 0; elems[i]; i++) {
                const elem = elems[i];
                if (elem.__control__ instanceof input_1.Input) {
                    result.push(elem.__control__);
                }
            }
            return result;
        }
        /**
         * 验证当期表单内的所有输入域。
         * @return 返回验证后的出错的字段列表。如果返回空数组说明验证成功。
         */
        checkValidity() {
            const inputs = this.inputs;
            const promises = [];
            const result = [];
            for (const input of inputs) {
                const inputResult = input.checkValidity();
                if (inputResult instanceof Promise) {
                    promises.push(inputResult.then(r => {
                        if (r) {
                            result.push(input);
                        }
                        return r;
                    }));
                }
                else if (inputResult) {
                    result.push(input);
                }
            }
            if (promises.length) {
                return Promise.all(promises).then(() => result);
            }
            return result;
        }
        /**
         * 向用户报告验证结果。
         */
        reportValidity() {
            const inputs = this.inputs;
            const promises = [];
            const result = [];
            for (const input of inputs) {
                const inputResult = input.reportValidity();
                if (inputResult instanceof Promise) {
                    promises.push(inputResult.then(r => {
                        if (r) {
                            result.push(input);
                        }
                        return r;
                    }));
                }
                else if (inputResult) {
                    result.push(input);
                }
            }
            if (promises.length) {
                return Promise.all(promises).then(() => result);
            }
            return result;
        }
        /**
         * 清空验证结果。
         */
        resetValidity() {
            this.inputs.forEach(input => input.resetValidity());
        }
    }
    __decorate([
        control_1.bind("", "action")
    ], Form.prototype, "action", void 0);
    exports.Form = Form;
    exports.default = Form;
});
//# sourceMappingURL=form (3).js.map