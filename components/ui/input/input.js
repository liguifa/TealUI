var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ui/control", "ux/status", "ui/toolTip"], function (require, exports, dom, control_1, status_1, toolTip_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个输入控件。
     */
    class Input extends control_1.default {
        render() {
            return control_1.VNode.create("input", { type: "hidden" });
        }
        /**
         * 获取真正存储输入值的 HTML 元素。
         */
        get input() {
            return (dom.find(this.elem, "input,select,textarea") || this.elem);
        }
        init() {
            if (this.validateEvent) {
                dom.on(this.input, this.validateEvent, this.reportValidity, this);
            }
        }
        /**
         * 字段值。
         */
        get value() { return this.input.value; }
        set value(value) {
            this.input.value = value;
            if (!this.hasOwnProperty("defaultValue")) {
                this.defaultValue = value;
            }
        }
        /**
         * 验证当前输入域。
         * @return 返回验证结果。如果正在执行异步验证则返回一个确认对象。
         */
        checkValidity() {
            // 测试是否已填数据。
            const value = this.value;
            if (value == null || (typeof value === "string" || Array.isArray(value)) && value.length === 0) {
                if (this.required) {
                    return { valid: false, status: "error", message: this.requiredMessage };
                }
                return { valid: true, status: "success", message: null };
            }
            // 执行内置验证。
            const result = this.normlizeValidityResult(this.validate(value));
            if (result instanceof Promise) {
                return result.then(result => {
                    if (!result.valid) {
                        return result;
                    }
                    // 执行自定义验证。
                    if (this.onValidate) {
                        return this.normlizeValidityResult(this.onValidate(value, this));
                    }
                    // 验证成功。
                    return result;
                });
            }
            if (!result.valid) {
                return result;
            }
            // 执行自定义验证。
            if (this.onValidate) {
                return this.normlizeValidityResult(this.onValidate(value, this));
            }
            // 验证成功。
            return result;
        }
        /**
         * 判断当前输入域是否需要验证。
         */
        get willValidate() {
            if (this.noValidate || this.readOnly || this.disabled || this.hidden) {
                return false;
            }
            if (this.onValidate || this.required || this.maxLength >= 0 || this.minLength >= 0 || this.max != null || this.min != null || this.pattern) {
                return true;
            }
            return false;
        }
        /**
         * 当被子类重写时负责验证指定的值。
         * @param value 要验证的值。
         * @return 返回验证结果。如果正在执行异步验证则返回一个确认对象。
         */
        validate(value) {
            if (this.maxLength >= 0 && value.length > this.maxLength) {
                return this.maxLengthMessage.replace("{bound}", this.maxLength).replace("{delta}", (value.length - this.maxLength));
            }
            if (this.minLength >= 0 && value.length < this.minLength) {
                return this.minLengthMessage.replace("{bound}", this.minLength).replace("{delta}", (this.minLength - value.length));
            }
            if (this.max != null && value > this.max) {
                return this.maxMessage.replace("{bound}", this.max);
            }
            if (this.min != null && value < this.min) {
                return this.minMessage.replace("{bound}", this.min);
            }
            if (this.pattern && !this.pattern.test(value)) {
                return this.patternMessage.replace("{bound}", this.pattern);
            }
            return "";
        }
        /**
         * 规范化验证结果对象。
         * @param result 用户返回的验证结果。
         * @param 返回已格式化的严重结果。
         */
        normlizeValidityResult(result) {
            if (result instanceof Promise) {
                return result.then(r => this.normlizeValidityResult(r));
            }
            if (typeof result === "boolean") {
                result = result ? "" : this.validateErrorMessage;
            }
            if (typeof result === "string") {
                return {
                    valid: !result,
                    status: result ? "error" : "success",
                    message: result ? this.validateErrorMessagePrefix + result : this.validateSuccessMessagePrefix + "",
                };
            }
            result.message = result.message || "";
            if (result.valid == undefined) {
                result.valid = !result.status || result.status === "success";
            }
            return result;
        }
        /**
         * 向用户报告验证结果。
         * @return 返回验证结果。如果正在执行异步验证则返回一个确认对象。
         */
        reportValidity() {
            const result = this.willValidate ? this.checkValidity() : { valid: true, status: null, message: null };
            if (result instanceof Promise) {
                if (!this._validatePromise) {
                    this.setCustomValidity({ valid: false, status: "warning", message: this.validateStartMessage });
                }
                const promise = this._validatePromise = result.then(result => {
                    if (this._validatePromise === promise) {
                        delete this._validatePromise;
                        this.setCustomValidity(result);
                    }
                    return result;
                }, (reason) => {
                    const result = this.normlizeValidityResult(this.validateFailMessage.replace("{reason}", reason));
                    if (this._validatePromise === promise) {
                        delete this._validatePromise;
                        this.setCustomValidity(result);
                    }
                    return result;
                });
                return promise;
            }
            this.setCustomValidity(result);
            return result;
        }
        /**
         * 设置自定义的验证消息。
         * @param validityResult 要报告的验证结果。
         */
        setCustomValidity(validityResult) {
            validityResult = this.normlizeValidityResult(validityResult);
            // 更新状态。
            this.status = validityResult.status;
            // 自定义错误报告。
            if (this.onReportValidity && this.onReportValidity(validityResult, this) === false) {
                return;
            }
            // 成功状态且没有设置消息则关闭提示。
            const successWithNoMessage = this.status === "success" && (!validityResult.message || validityResult.message === this.validateSuccessMessagePrefix);
            const tip = dom.next(this.elem, ".x-tip,.x-tipbox");
            if (tip) {
                const isTipBox = dom.hasClass(tip, "x-tipbox");
                status_1.setStatus(tip, isTipBox ? "x-tipbox-" : "x-tip-", this.status);
                tip.innerHTML = validityResult.message;
                if (isTipBox) {
                    dom.toggle(tip, !!this.status);
                    dom.toggleClass(tip, "x-transparent", successWithNoMessage);
                }
                else {
                    dom.toggle(tip, !!this.status && !successWithNoMessage);
                }
            }
            else {
                let validityToolTip = this._validityToolTip;
                if (this.status && !successWithNoMessage) {
                    if (!validityToolTip) {
                        this._validityToolTip = validityToolTip = new toolTip_1.default();
                        validityToolTip.event = "focusin";
                        validityToolTip.target = this.elem;
                        validityToolTip.onShow = () => {
                            if (!this.status || this.status === "success") {
                                this._validityToolTip.hide();
                            }
                        };
                        Object.assign(validityToolTip, this.validityToolTipOptions);
                        dom.after(this.elem, validityToolTip.elem);
                    }
                    const arrow = dom.first(validityToolTip.elem, ".x-arrow");
                    validityToolTip.elem.innerHTML = validityResult.message;
                    if (arrow)
                        dom.prepend(validityToolTip.elem, arrow);
                    validityToolTip.show();
                }
                else if (validityToolTip) {
                    validityToolTip.hide();
                }
            }
        }
        /**
         * 控件状态。
         */
        get status() {
            return status_1.getStatus(this.elem, this.statusClassPrefix);
        }
        set status(value) {
            status_1.setStatus(this.elem, this.statusClassPrefix, value);
        }
        /**
         * 重置当前输入域。
         */
        reset() {
            this.setCustomValidity({ valid: true, status: null, message: null });
            this.value = this.defaultValue;
        }
        /**
         * 令当前控件获得焦点。
         */
        focus() {
            this.input.focus();
        }
        /**
         * 令当前控件失去焦点。
         */
        blur() {
            this.input.blur();
        }
    }
    /**
     * 本地化提示文案。
     */
    Input.locale = {
        requiredMessage: `该字段为必填的`,
        maxLengthMessage: `该字段最大长度为 {bound}，超出 {delta}`,
        minLengthMessage: `该字段最少长度为 {bound}，缺少 {delta}`,
        maxMessage: `该字段最大为 {bound}`,
        minMessage: `该字段最小为 {bound}`,
        patternMessage: `该字段格式不正确`,
        validateErrorMessage: `该字段存在错误`,
        validateStartMessage: `<i class="x-icon x-spin">҉</i> 正在验证中...`,
        validateFailMessage: `无法验证：{reason}`,
        validateInfoMessagePrefix: `<i class="x-icon">🛈</i> `,
        validateSuccessMessagePrefix: `<i class="x-icon">✓</i> `,
        validateWarningMessagePrefix: `<i class="x-icon">⚠</i> `,
        validateErrorMessagePrefix: `<i class="x-icon">&#10071;</i> `
    };
    __decorate([
        control_1.bind("@input", "name")
    ], Input.prototype, "name", void 0);
    __decorate([
        control_1.bind("@input", "type")
    ], Input.prototype, "type", void 0);
    __decorate([
        control_1.bind("@input", "placeholder")
    ], Input.prototype, "placeholder", void 0);
    __decorate([
        control_1.bind("@input", "disabled")
    ], Input.prototype, "disabled", void 0);
    __decorate([
        control_1.bind("@input", "readOnly")
    ], Input.prototype, "readOnly", void 0);
    __decorate([
        control_1.bind("@input", "onCopy")
    ], Input.prototype, "onCopy", void 0);
    __decorate([
        control_1.bind("@input", "onCut")
    ], Input.prototype, "onCut", void 0);
    __decorate([
        control_1.bind("@input", "onPaste")
    ], Input.prototype, "onPaste", void 0);
    __decorate([
        control_1.bind("@input", "onBeforeCopy")
    ], Input.prototype, "onBeforeCopy", void 0);
    __decorate([
        control_1.bind("@input", "onBeforeCut")
    ], Input.prototype, "onBeforeCut", void 0);
    __decorate([
        control_1.bind("@input", "onBeforePaste")
    ], Input.prototype, "onBeforePaste", void 0);
    __decorate([
        control_1.bind("@input", "onFocus")
    ], Input.prototype, "onFocus", void 0);
    __decorate([
        control_1.bind("@input", "onBlur")
    ], Input.prototype, "onBlur", void 0);
    __decorate([
        control_1.bind("@input", "onFocusIn")
    ], Input.prototype, "onFocusIn", void 0);
    __decorate([
        control_1.bind("@input", "onFocusOut")
    ], Input.prototype, "onFocusOut", void 0);
    __decorate([
        control_1.bind("@input", "onInput")
    ], Input.prototype, "onInput", void 0);
    __decorate([
        control_1.bind("@input", "onChange")
    ], Input.prototype, "onChange", void 0);
    __decorate([
        control_1.bind("@input", "onKeyDown")
    ], Input.prototype, "onKeyDown", void 0);
    __decorate([
        control_1.bind("@input", "onKeyPress")
    ], Input.prototype, "onKeyPress", void 0);
    __decorate([
        control_1.bind("@input", "onKeyUp")
    ], Input.prototype, "onKeyUp", void 0);
    exports.default = Input;
    for (const key in Input.locale) {
        Input.prototype[key] = Input.locale[key];
    }
    Input.prototype.statusClassPrefix = "x-";
    Input.prototype.validateEvent = "change";
});
//# sourceMappingURL=input.js.map