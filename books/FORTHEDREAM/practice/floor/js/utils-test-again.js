var utils = (function () {
    var flag = "getComputedStyle" in window;

    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry);
        }
        var ary = [];
        for (var i = 0, len = likeAry.length; i < len; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }

    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    function children(curEle, tagName) {
        var ary = [];
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                if (curNode.nodeType === 1) {
                    ary[ary.length] = curNode;
                }
                nodeList = null;
            }
        } else {
            ary = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curName = ary[k];
                if (curName.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            }
        }
        return ary;
    }

    function firstChild(curEle) {
        var fir = utils.children(curEle);
        return fir.length > 0 ? fir[0] : null;
    }

    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    function addClass(curEle, className) {
        var ary = className.replace(/^(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }

    function removeClass(curEle, className) {
        var ary = className.replace(/^(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");

            }

        }
    }

    function getElementsByClass(strClass, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }

        var ary = [], strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/g);
        var nodeList = this.listToArray(context.getElementsByTagName("*"));
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var curNode = nodeList[i];
            var isOk = true;
            for (var k = 0; k < strClassAry.length; k++) {
                var curName = strClassAry[k];
                var reg = new RegExp("(^| +)" + curName + "( +|$)");
                if (!reg.test(curNode.className)) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    }

    function getCss(attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr === "opacity") {
                val = this.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(attr, value) {
        if (attr === "opacity") {
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity='" + value * 100 + "')";
            return;
        }
        if (attr === "float") {
            this["style"]["cssFloat"] = attr;
            this["style"]["styleFloat"] = attr;
            return;
        }
        var reg = /^(width|height|left|bottom|right|top|((margin|padding)(left|top|bottom|right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px";
            }
        }
        this["style"][attr] = value;
    }

    function setGroupCss(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key]);
            }
        }
    }

    function css(curEle) {
        var argTwo = arguments[1], ary = Array.prototype.slice.call(arguments, 1);
        if (typeof argTwo === "string") {
            if (typeof arguments[2] === "undefined") {
                return getCss.apply(curEle, ary);
            }
            setCss.apply(curEle, ary);
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(curEle, ary);
        }
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift = pre;
            pre = this.prev(pre);
        }
        return ary;
    }

    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    function sibling(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;
        return ary;
    }

    function siblings(curEle) {
        var preAll = this.prevAll(curEle);
        var nexAll = this.nextAll(curEle);
        return prevAll.concat(nexAll);
    }

    return {
        listToArray: listToArray,
        formatJSON: formatJSON,
        children: children,
        firstChild: firstChild,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClass: getElementsByClass,
        css: css,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings
    }

})
();