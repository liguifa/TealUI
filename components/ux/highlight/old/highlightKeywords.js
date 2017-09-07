// #todo
/**
 * @author
 */
//千一网络 www.cftea.com
//EZJ v1.0 MIT
//http://www.cftea.com/products/EZJ/
//此文件为 UTF-8 格式
//相关阅读：http://www.cftea.com/products/EZJ/handbook.htm
var EZJ = new function () {
    this.version = "v1.0";
    this.plugin = new EZJ_Plugin();
};
//加载插件时：
//IE 把 404 等错误内容也当作 JavaScript 代码加载，只是这些内容是错误的 JavaScript 代码。
//Firefox 不会加载 404 等状态的内容。
//所以请确保插件地址是正确的，以使能够正确加载，以避免在不同浏览器中发生不同的错误。
//属性 location，字符串。插件所在文件夹的地址。
//事件 onComplete，函数。加载完成一个插件后触发该函数，并将加载完成的插件名称作为参数传递进入事件处理函数。
//方法 load。加载一个或多个插件。
//load(pluginInfo1[, pluginInfo2[, pluginInfo3[, ...[, pluginInfoN]]]])
//参数 pluginInfo 字符串或对象。
//pluginInfo 可以是插件名称，此时 location + pluginName + ".js" 组成插件地址。
//pluginInfo 也可以是含有 name、url 属性的对象。name 表示插件名称，url 表示插件地址，此时插件地址不受 location、插件名称等的影响。
function EZJ_Plugin() {
    this.location = "";
    this.onComplete = null;
    this.load = function () {
        var pluginName, pluginUrl;
        for (var i = 0; i < arguments.length; i++) {
            if (typeof (arguments[i]) == "string") {
                pluginName = arguments[i];
                pluginUrl = this.location + pluginName + ".js";
            }
            else {
                pluginName = arguments[i].name;
                pluginUrl = arguments[i].url;
            }
            var script = $C("script", [{ name: "type", value: "text/javascript" }]);
            if (this.onComplete) {
                var onComplete = this.onComplete;
                //Firefox 一类响应 onload，并且无 readyState。
                script.onload = function () {
                    onComplete(pluginName);
                };
                //IE 一类浏览器。
                script.onreadystatechange = function () {
                    if (script.readyState == 4 || script.readyState == "loaded" || script.readyState == "complete") {
                        onComplete(pluginName);
                    }
                };
            }
            script.setAttribute("src", pluginUrl);
            $C(script, null, document.body);
        }
    };
}
//================================================================================
//根据元素 Id，获取一个或多个元素对象。
//语法：$(element1[, element2[, element3[, ...[, elementN]]]])
//参数 element，字符串或对象。控件 Id 或控件对象。
//如果只有一个参数，则返回元素对象。
//如果有多个参数，则以数组的形式返回元素对象。
function $() {
    var element = null;
    var elements = new Array();
    for (var i = 0; i < arguments.length; i++) {
        if (typeof (arguments[i]) == "string") {
            element = document.getElementById(arguments[i]);
        }
        else {
            element = arguments[i];
        }
        elements.push(element);
    }
    if (arguments.length <= 1) {
        return element;
    }
    return elements;
}
//获取、设置控件的值。将控件的 value、src、innerHTML 属性值作为值。
//语法：$V(control[, value])
//参数 control，字符串或对象。要获取和/或设置值的控件。
//参数 value，字符串。控件的新值。
//返回控件的值或新值。
function $V(control) {
    var result = null;
    var e = $(control);
    if (typeof (e.value) != "undefined") {
        if (arguments.length >= 2) {
            e.value = arguments[1];
        }
        result = e.value;
    }
    else if (typeof (e.src) != "undefined") {
        if (arguments.length >= 2) {
            e.src = arguments[1];
        }
        result = e.src;
    }
    else if (typeof (e.innerHTML) != "undefined") {
        if (arguments.length >= 2) {
            e.innerHTML = arguments[1];
        }
        result = e.innerHTML;
    }
    return result;
}
//设置控件是否可用。
//语法：$E(control, enable)
//参数 control，字符串或对象。
//参数 enable，布尔。
function $E(control, enable) {
    $(control).disabled = !enable;
}
//设置控件是否显示。
//语法：$D(control, display)
//参数 control，字符串或对象。
//参数 display，布尔或字符串。通过 true、false 或 block、none 来设置是否显示。
function $D(control, display) {
    if (display || display == "block") {
        $(control).style.display = "block";
    }
    else if (!display || display == "none") {
        $(control).style.display = "none";
    }
}
//创建、设置、追加控件。支持 text、textarea、radio、checkbox、button、submit、reset 以及其它控件名称。
//语法：$C(control[, attributes[, parentControl]])
//参数 control，字符串或对象。要创建的控件名称或控件对象。
//参数 attributes，对象数组。含有 name、value 属性的对象数组。
//参数 parentControl，字符串或对象。创建的控件存放的位置。
//返回新创建或新设置的控件。
function $C(control) {
    var e = null;
    if (typeof (control) == "string") {
        switch (control) {
            case "text":
                e = document.createElement("input");
                e.type = "text";
                break;
            case "textarea":
                e = document.createElement("textarea");
                break;
            case "radio":
                e = document.createElement("input");
                e.type = "radio";
                break;
            case "checkbox":
                e = document.createElement("input");
                e.type = "checkbox";
                break;
            case "button":
                e = document.createElement("input");
                e.type = "button";
                break;
            case "submit":
                e = document.createElement("input");
                e.type = "submit";
                break;
            case "reset":
                e = document.createElement("input");
                e.type = "reset";
                break;
            default:
                e = document.createElement(control);
                break;
        }
    }
    else {
        e = control;
    }
    //设置控件
    if (arguments.length >= 2) {
        var attributes = arguments[1];
        if (attributes) {
            for (var i = 0; i < attributes.length; i++) {
                e.setAttribute(attributes[i].name, attributes[i].value);
            }
        }
    }
    //追加控件
    if (arguments.length >= 3) {
        var parentControl = arguments[2];
        if (parentControl) {
            $(parentControl).appendChild(e);
        }
    }
    return e;
}
//================================================================================
//String
String.prototype.left = function (length) {
    return this.substr(0, length);
};
String.prototype.right = function (length) {
    return this.substr(this.length - length, length);
};
String.prototype.trimLeft = function () {
    return this.replace(/^[ 　]+/gi, "");
};
String.prototype.trimRight = function () {
    return this.replace(/[ 　]+$/gi, "");
};
//千一网络 www.cftea.com
//HighlightKey v1.0 MIT
//http://www.cftea.com/products/HighlightKey/
//需要 EZJ v1.0
//此文件为 UTF-8 格式
//应用示例：
/*
highlightKey("content", ["千一", "cftea"], ["#FF0000", "#009999"], ["#00FF00", "#666666"]);
*/
//参数 target，字符串或对象。要查找并高亮其内容的控件 Id 或控件对象。
//参数 keys，数组。要查找的词的数组。
//参数 bgColors，数组。高亮时各个查找词的背景色。
//参数 colors，数组。高亮时各个查找词的前景色。
function highlightKey(target, keys, bgColors, colors) {
    var e = $(target);
    if (e.nodeType == 3) {
        //文本节点
        highlightKey_replace(e, keys, bgColors, colors);
        return;
    }
    //循环子节点
    for (var i = 0; i < e.childNodes.length; i++) {
        var node = e.childNodes[i];
        if (node.nodeType != 3) {
            //子节点不是文本节点，可能需要递归继续处理。
            if (node.nodeName.toLowerCase() != "textarea") {
                //textarea、button 中的内容不能替换，因为不响应 HTML，也就无法标明关键字。
                //input 控件中也不响应 HTML，但显示的内容是在其属性 value 中，这里并不判断属性的值。
                //同理也不用担心替换到 a 的 title、img 的 alt 等。
                //注意：可以在 <button>按钮</button> 上使用高亮效果。
                highlightKey(node, keys, bgColors, colors);
            }
        }
        else if (node.nodeType == 3) {
            highlightKey_replace(node, keys, bgColors, colors);
        }
    }
}
function highlightKey_replace(textNode, keys, bgColors, colors) {
    var str = textNode.nodeValue;
    for (var i = 0; i < keys.length; i++) {
        var re = new RegExp("(" + keys[i] + ")", "gi");
        if (bgColors && colors) {
            str = str.replace(re, "<font style=\"background-color:" + bgColors[i] + ";color:" + colors[i] + ";\">$1</font>");
        }
        else if (bgColors) {
            str = str.replace(re, "<font style=\"background-color:" + bgColors[i] + ";\">$1</font>");
        }
        else if (colors) {
            str = str.replace(re, "<font style=\"color:" + colors[i] + ";\">$1</font>");
        }
    }
    //替换节点。
    //由于 nodeValue 并不支持 HTML，所以采用了一种技巧（http://www.cftea.com/c/2008/11/F9N72VIWFS2G7459.asp）：
    //首先将替换后的 textNode 的内容装于一个 div；
    //然后再将 div 中各个节点（由于有了 HTML，不再是一个节点）插入到 textNode 之前；
    //再删除 textNode。
    var e = $C("div");
    $V(e, str);
    //注意：insertBefore 会删除源节点，请参见 http://www.cftea.com/c/2008/11/LL4JWZBYUWM1UD1K.asp。
    while (e.childNodes.length > 0) {
        textNode.parentNode.insertBefore(e.childNodes[0], textNode);
    }
    textNode.parentNode.removeChild(textNode);
}
//# sourceMappingURL=highlightKeywords.js.map