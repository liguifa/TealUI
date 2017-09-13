/**
 * 载入一个模块。
 * @param {string | string[]} path 要载入的模块路径。
 * @param {Function} [callback] 模块载入后的回调函数。
 * @return 返回模块的导出项。
 */
function require(path, callback) {
    if (typeof path === "string") {
        return require._ensure(require.toUrl(path), callback).exports;
    }
    require._load({
        deps: path,
        factory: callback,
        callbacks: []
    });
}
/**
 * 解析指定模块的实际地址。
 * @param {string} path 要解析的模块路径。
 * @param {string} [base] 解析的基路径。
 * @return 返回已解析的模块实际地址。
 */
require.toUrl = (path, base) => {
    path = require.alias[path] || path;
    if (path == "_") {
        return null;
    }
    const anchor = require._anchor || (require._anchor = document.createElement("a"));
    anchor.href = /(^|:\/)\//.test(path) ? path : (path.charCodeAt(0) === 46 /*.*/ ? base ? `${base}/../${path}` : path : require.baseUrl + path.replace(/^([^\/]+)\/([^\/\.]+)$/, "$1/$2/$2")).replace(/(^|\/)([^\/\.]+)$/i, `$1$2${/^typo\//i.test(path) ? ".css" : ".js"}`).replace(/\.(sc|le)ss$/i, ".css").replace(/\.(jsx|tsx?)$/i, ".js");
    return anchor.href;
};
/**
 * 模块别名列表。
 */
require.alias = { __proto__: null };
require.getCurrentScript = () => {
    return (document.currentScript || document.getElementsByTagName("script")[0]).src;
};
/**
 * 所有模块的基路径。
 */
require.baseUrl = require.getCurrentScript().replace(/\/[^\/]*([?#].*)?$/, "/");
/**
 * 请求模块时在地址后追加的参数。
 */
require.urlArgs = "";
require._ensure = (url, callback) => {
    if (!url) {
        callback && callback();
        return {};
    }
    let module = require.modules[url];
    if (!module) {
        module = {};
        const actualUrl = url + require.urlArgs;
        if (/\.css(\?|$)/i.test(url)) {
            require.css(actualUrl);
            callback && callback();
        }
        else {
            module.callbacks = [callback];
            require.js(actualUrl, () => {
                require._load(module, url);
            });
        }
        require.modules[url] = module;
    }
    else if (module.callbacks) {
        module.callbacks.push(callback);
    }
    else if (!module.factory) {
        callback && callback(module.exports);
    }
    else {
        module.callbacks = [callback];
        require._load(module, url);
    }
    return module;
};
require.modules = {};
require.css = path => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;
    (document.head || document.getElementsByTagName("head")[0] || document.body || document.documentElement).appendChild(link);
};
require.js = (path, callback) => {
    const script = document.createElement("script");
    script.async = true;
    script.onload = script.onreadystatechange = () => {
        const readyState = script.readyState;
        if (readyState == undefined || readyState == "loaded" || readyState == "complete") {
            script.onload = script.onreadystatechange = null;
            callback && callback();
        }
    };
    script.src = path;
    const first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);
};
require._load = (module, url) => {
    let pending = 1;
    const depModules = [];
    const resolve = () => {
        if (--pending < 1) {
            const factory = module.factory;
            if (factory) {
                delete module.factory;
                for (let i = 0; i < depModules.length; i++) {
                    depModules[i] = depModules[i].exports;
                }
                const exports = factory(...depModules);
                if (exports != undefined) {
                    module.exports = exports;
                }
            }
            for (const callback of module.callbacks) {
                callback && callback(module.exports);
            }
            delete module.callbacks;
        }
    };
    if (module.deps) {
        for (const dep of module.deps) {
            depModules.push(dep == "require" ? {
                exports: path => require(path, url)
            } : dep == "exports" ? module : (pending++, require._ensure(require.toUrl(dep, url), resolve)));
        }
    }
    resolve();
};
/**
 * 定义一个模块。
 * @param {string} [path] 模块的路径。
 * @param {string[]} [deps] 模块的依赖项。
 * @param {Function} factory 模块的内容。
 * @return 返回定义的模块。
 */
function define(path, deps, factory) {
    if (typeof path == "function") {
        deps = path;
        path = [];
    }
    if (typeof deps == "function") {
        factory = deps;
        if (typeof path == "string") {
            deps = [];
        }
        else {
            deps = path;
            path = require.getCurrentScript();
        }
    }
    path = require.toUrl(path);
    const module = require.modules[path] || (require.modules[path] = {});
    module.deps = deps;
    module.factory = factory;
    module.exports = {};
    return module;
}
define.amd = {
    provider: "TealUI"
};
//# sourceMappingURL=require.js.map