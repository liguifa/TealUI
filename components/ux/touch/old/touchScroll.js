// #todo
/**
 * @author
 */
Fx.TouchScroll = Base.extend({
    v: 0,
    y: 0,
    onMouseDown: function (e) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
        }
        this.y = e.pageY;
        this.v = 0;
        Dom.un(this.elem, 'mousedown', this.onMouseDown);
        Dom.on(this.elem, 'mousemove', this.onMouseMove, this);
        Dom.on(this.elem, 'mouseup', this.onMouseUp, this);
    },
    onMouseMove: function (e) {
        this.v = e.pageY - this.y;
        this.y = e.pageY;
        var child = this.elem;
        Dom.setScroll(child, { y: Dom.getScroll(child).y + this.v });
    },
    onMouseUp: function (e) {
        var me = this;
        me.v *= 5;
        this.timer = setInterval(function () {
            var child = me.elem;
            me.v /= 1.4;
            if (Math.abs(me.v) < 1) {
                clearInterval(me.timer);
                me.timer = 0;
            }
            Dom.setScroll(child, { y: Dom.getScroll(child).y + me.v });
        }, 100);
        Dom.on(this.elem, 'mousedown', this.onMouseDown, this);
        Dom.un(this.elem, 'mousemove', this.onMouseMove);
        Dom.un(this.elem, 'mouseup', this.onMouseUp);
    },
    constructor: function (dom) {
        this.elem = dom;
        Dom.on(this.elem, 'mousedown', this.onMouseDown, this);
    }
});
//# sourceMappingURL=touchScroll.js.map