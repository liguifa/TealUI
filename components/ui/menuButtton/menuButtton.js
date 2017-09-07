define(["require", "exports", "control", "./menuButtton.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个菜单按钮。
     */
    class MenuButtton extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-menubuttton" });
        }
    }
    exports.MenuButtton = MenuButtton;
    exports.default = MenuButtton;
    /**
     * @author  xuld
     */
    /**
     * @author  xuld
     */
    typeof include === "function" && include("../control/base");
    typeof include === "function" && include("../control/dropDown");
    var MenuButton = control_1.Control.extend({
        role: "menuButton",
        init: function () {
            var me = this;
            me.dropDown = (Dom(me.menu).valueOf() || me.dom.next('.x-popover, .x-dropdownmenu')).role('popover', {
                target: me.dom
            }).on('show', function () {
                me.dom.addClass('x-button-active');
            }).on('hide', function () {
                me.dom.removeClass('x-button-active');
            });
        }
    });
    using("Controls.Core.IDropDownOwner");
    using("Controls.Button.Button");
    using("Controls.Button.Menu");
    var MenuButton = Button.extend(IDropDownOwner).implement({
        xtype: 'menubutton',
        tpl: '<button class="x-button x-control" type="button">&nbsp;<span class="x-button-menu"></span></button>',
        content: function () {
            return this.find('.x-button-menu').prev(true);
        },
        createDropDown: function (existDom) {
            if (existDom && !existDom.hasClass('x-menu')) {
                return existDom;
            }
            return new Menu(existDom).on('click', this.onDropDownClick, this);
        },
        init: function () {
            var next = this.next();
            this.setDropDown(this.createDropDown(next && next.hasClass('x-dropdown') ? next : null));
            this.on('click', this.toggleDropDown, this);
        },
        onDropDownShow: function () {
            this.actived(true);
            return IDropDownOwner.onDropDownShow.apply(this, arguments);
        },
        onDropDownHide: function () {
            this.actived(false);
            return IDropDownOwner.onDropDownHide.apply(this, arguments);
        },
        onDropDownClick: function () {
            this.hideDropDown();
        }
    });
    ListControl.aliasMethods(MenuButton, 'dropDown');
});
//# sourceMappingURL=menuButtton.js.map