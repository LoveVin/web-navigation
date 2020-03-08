// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var staticHashGroupMap = [{
  groupName: '娱乐',
  hashMap: [{
    url: 'https://www.acfun.cn/',
    siteLogo: 'https://www.acfun.cn/favicon.ico',
    siteName: 'AcFun'
  }, {
    url: 'https://www.bilibili.com/',
    siteLogo: 'https://www.bilibili.com/favicon.ico',
    siteName: 'bilibili'
  }],
  isActive: 'active'
}, {
  groupName: '设计',
  hashMap: [{
    url: 'https://huaban.com/',
    siteLogo: 'https://huaban.com/favicon.ico',
    siteName: '花瓣网'
  }, {
    url: 'https://www.zcool.com.cn/',
    siteLogo: 'https://www.zcool.com.cn/favicon.ico',
    siteName: '站酷'
  }],
  isActive: ''
}];
/*从localStorage取出数据*/

var hashString1 = localStorage.getItem('hashGroupMap');
var hashObject = JSON.parse(hashString1);
var hashGroupMap = hashObject || staticHashGroupMap;
var hashString2 = localStorage.getItem("curGroupIndex");
var hashNumber = Number(hashString2);
var curGroupIndex = hashNumber; //当前选中的分组

var startPos = 0;
var endPos = 5;
/*简化Url*/

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www', '').replace(/\/.*/, ''); //正则表达式删除/后面内容
};

var render;
var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;

if (is_mobi) {
  console.log('mobile');
  $('.groupLast').css('display', 'none');

  render = function render() {
    hashGroupMap.forEach(function ($hashNode, index) {
      var $siteList = $(".siteList");
      var $last = $siteList.find("li.last");
      $siteList.find('li:not(.last)').remove();
      var hashMap = $hashNode.hashMap;
      hashMap.forEach(function (node, index) {
        var $li = $("\n                    <li title=\"".concat(node.siteName, "\">\n                        <div class=\"site\">\n                            <div class=\"siteLogo\">\n                                <img src=\"").concat(node.siteLogo, "\" width='24px' height='24px'>\n                            </div>\n                            <div class=\"siteName\">").concat(node.siteName, "</div>\n                            <div class=\"siteMore\" data-url=\"").concat(node.url, "\">\n                                <svg class=\"icon\" aria-hidden=\"true\">\n                                    <use xlink:href=\"#icon-more\"></use>\n                                </svg>\n                            </div>\n                        </div>\n                    </li>\n                ")).insertBefore($last);
      });
    });
  };
} else {
  /*页面刷新*/
  console.log('PC');

  render = function render() {
    var $groupList = $('.siteGroupList');
    var $lastGroup = $groupList.find('li.groupLast');
    $groupList.find('li:not(.groupLast)').remove();
    hashGroupMap.forEach(function ($hashNode, index) {
      if (index >= startPos && index <= endPos) {
        //渲染当前分组
        var $groupLi = $("\n                <li title=\"".concat($hashNode.groupName, "\">").concat($hashNode.groupName, "</li>\n                ")).insertBefore($lastGroup);
        var liNode = $('.siteGroupList li').eq(index - startPos); //渲染当前分组内容

        if ($hashNode.isActive) {
          liNode.addClass('active');
          var outIndex = index;
          curGroupIndex = index;
          var $siteList = $(".siteList");
          var $last = $siteList.find("li.last");
          $siteList.find('li:not(.last)').remove();
          var hashMap = $hashNode.hashMap;
          hashMap.forEach(function (node, index) {
            var $li = $("\n                            <li title=\"".concat(node.siteName, "\">\n                                <div class=\"site\">\n                                    <div class=\"siteLogo\">\n                                        <img src=\"").concat(node.siteLogo, "\" width='24px' height='24px'>\n                                    </div>\n                                    <div class=\"siteName\">").concat(node.siteName, "</div>\n                                    <div class=\"siteMore\" data-url=\"").concat(node.url, "\">\n                                        <svg class=\"icon\" aria-hidden=\"true\">\n                                            <use xlink:href=\"#icon-more\"></use>\n                                        </svg>\n                                    </div>\n                                </div>\n                            </li>\n                        ")).insertBefore($last);
          });
        } else {
          if (liNode.hasClass('active')) {
            liNode.removeClass('active');
          }
        }
      }
    });
  };

  render();
  /*分组左右箭头点击事件*/

  var leftFun = function leftFun() {
    var width = $('.siteGroupList').css('width');

    if (startPos > 0) {
      startPos -= 6;
      endPos -= 6;
      render();
    }
  };

  $('.siteGroupAll .Arrowleft').on('click', function () {
    leftFun();
  });

  var rightFun = function rightFun() {
    var length = hashGroupMap.length;

    if (endPos <= length - 1) {
      startPos += 6;
      endPos += 6;
      render();
    }
  };

  $('.siteGroupAll .Arrowright').on('click', function () {
    rightFun();
  });
  /*键盘事件*/

  $(document).on('keydown', function (e) {
    if (e.ctrlKey) {
      if (e.key === "ArrowUp") {
        $('.globalMain').animate({
          height: 'toggle'
        }, 500);
      } else if (e.key === "ArrowDown") {
        var h = $(document).height() - $(window).height();
        $(document).scrollTop(h);
      }
    }

    if (e.key === 'x') {
      logoFun();
    }

    if (e.key === 'ArrowLeft') {
      if (curGroupIndex - startPos >= 0) {
        hashGroupMap.forEach(function (node, index) {
          if (index === curGroupIndex && curGroupIndex > 0) {
            node.isActive = '';
          } else if (index === curGroupIndex - 1 && curGroupIndex > 0) {
            node.isActive = 'active';
          }
        });

        if (curGroupIndex % 6 === 0) {
          leftFun();
          /*缺少一种情况，即在新的一页只有add分组时*/
        } else {
          render();
        }
      } else {
        leftFun();
      }
    }

    if (e.key === 'ArrowRight') {
      var length = hashGroupMap.length;
      hashGroupMap.forEach(function (node, index) {
        if (index === curGroupIndex && curGroupIndex < length - 1) {
          node.isActive = '';
        } else if (index === curGroupIndex + 1 && curGroupIndex < length - 1) {
          node.isActive = 'active';
        }
      });

      if (curGroupIndex % 6 === 5) {
        rightFun();
      } else {
        render();
      }
    }
  });
  /*切换分组*/

  $('.siteModule .siteModuleGroup').hover(function () {
    $(this).children().eq(1).children('.groupArrow').addClass('active');
  }, function () {
    $(this).children().eq(1).children('.groupArrow').removeClass('active');
  });
  $('.siteGroupAll .Arrowleft').hover(function () {
    $(this).find('use').attr('xlink:href', '#icon-left-colored');
  }, function () {
    $(this).find('use').attr('xlink:href', '#icon-left');
  });
  $('.siteGroupAll .Arrowright').hover(function () {
    $(this).find('use').attr('xlink:href', '#icon-right-colored');
  }, function () {
    $(this).find('use').attr('xlink:href', '#icon-right');
  });
}
/*切换搜索引擎logo*/


var isLogoUp = true;
var $global = $(".globalHeader");
var $logo = $(".globalHeader .searchLogo");

var logoFun = function logoFun() {
  if (isLogoUp) {
    $global.find('img').attr('src', './images/google.png');
    $global.find('form').attr('action', 'https://www.google.com.hk/search');
    $global.find('input').attr('name', 'q');
    isLogoUp = false;
  } else {
    $global.find('img').attr('src', './images/baidu.png');
    $global.find('form').attr('action', 'https://www.baidu.com/s');
    $global.find('input').attr('name', 'wd');
    isLogoUp = true;
  }
};

$logo.on('click', logoFun);
/*搜索按钮点击事件*/

$(".searchButton").on('click', function () {
  $(".searchForm").submit();
});
/*国内外网站切换按钮*/

var isSwitchOn = true;
var $switch = $('.siteModuleGroup .siteSwitch');

var switchFun = function switchFun() {
  if (isSwitchOn) {
    $switch.find('use').attr('xlink:href', '#icon-switch-off');
    isSwitchOn = false;
  } else {
    $switch.find('use').attr('xlink:href', '#icon-switch-on');
    isSwitchOn = true;
  }
};

$switch.on('click', switchFun);
/*添加分组按钮点击事件*/

$('.siteGroupList .groupLast').on('click', function () {
  layer.open({
    type: 1,
    title: '添加分组',
    skin: 'myskin',
    //加上边框
    area: ['350px', '180px'],
    //宽高
    shade: [0.8, '#393D49'],
    content: "\n        <div class=\"midifyWebSite\">\n            <div class=\"modifyFrame\">\n                <div class=\"mofifyName\">\u540D\u79F0</div>\n                <input type=\"text\" class=\"name\">\n            </div>\n        </div>\n        ",
    btn: ['完成'],
    yes: function yes(index, layero) {
      var name = $('.modifyFrame .name').val();

      if (name !== null) {
        hashGroupMap.push({
          groupName: name,
          hashMap: []
        });
        render();
      }

      layer.close(index);
    }
  });
});
/*分组的鼠标右单击修改分组信息*/

$(document).on('contextmenu', '.siteGroupList li', function (e) {
  e.preventDefault();
  var liNode = $('.siteGroupList li').eq(curGroupIndex - startPos);

  if (this === liNode[0]) {
    layer.open({
      type: 1,
      title: '修改分组信息',
      skin: 'myskin',
      //加上边框
      area: ['350px', '180px'],
      //宽高
      shade: [0.8, '#393D49'],
      content: "\n            <div class=\"midifyWebSite\">\n                <div class=\"modifyFrame\">\n                    <div class=\"mofifyName\">\u540D\u79F0</div>\n                    <input type=\"text\" class=\"name\" value=".concat(liNode[0].textContent, ">\n                </div>\n            </div>\n            "),
      btn: ['删除', '完成'],
      yes: function yes(index, layero) {
        hashGroupMap.splice(curGroupIndex, 1);
        hashGroupMap[0].isActive = "active";
        curGroupIndex = 0;
        render();
        layer.close(index);
      },
      btn2: function btn2(index, layero) {
        var name = $('.modifyFrame .name').val();
        hashGroupMap[curGroupIndex].groupName = name;
        render();
        layer.close(index);
      }
    });
  }
});
/*非添加分组按钮点击事件*/

$(document).on('click', '.siteGroupList li:not(.groupLast)', function () {
  var liIndex = $('.siteGroupList li').index(this) + startPos;
  hashGroupMap.forEach(function ($hashNode, index) {
    $hashNode.isActive = '';

    if (index === liIndex) {
      $hashNode.isActive = 'active';
    }
  });
  render();
});
/*添加网址导航*/

$('.siteAddButton').on('click', function () {
  layer.open({
    type: 1,
    title: '添加网址导航',
    skin: 'myskin',
    //加上边框
    area: ['350px', '250px'],
    //宽高
    shade: [0.8, '#393D49'],
    content: "\n        <div class=\"midifyWebSite\">\n            <div class=\"modifyFrame\">\n                <div class=\"mofifyName\">\u540D\u79F0</div>\n                <input type=\"text\" class=\"name\">\n                <div class=\"mofifyName\">\u7F51\u5740 </div>\n                <input type=\"text\" class=\"site\">\n            </div>\n        </div>\n        ",
    btn: ['完成'],
    yes: function yes(index, layero) {
      var name = $('.modifyFrame .name').val();
      var url = $('.modifyFrame .site').val();

      if (url.indexOf('http') !== 0) {
        url = "https://" + url;
      }

      var hashMap;
      hashGroupMap.forEach(function ($hashNode) {
        if ($hashNode.isActive === 'active') {
          hashMap = $hashNode.hashMap;
        }
      });
      hashMap.push({
        url: url,
        siteLogo: url + '/favicon.ico',
        siteName: name
      });
      render();
      layer.close(index);
    }
  });
});
/*网址鼠标移入移出事件*/

$('.siteModuleClass').on('mouseenter', 'li', function () {
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  $(this).children().eq(0).children().eq(2).addClass('active');
});
$('.siteModuleClass').on('mouseleave', 'li', function () {
  $(this).removeClass('active');
  $(this).children().eq(0).children().eq(2).removeClass('active');
}); //绑定hover事件不成功，换绑定双事件

/*网址点击跳转*/

$('.siteModuleClass').on('click', 'li', function (e) {
  window.open($(this).find('.siteMore').data('url'), '_self');
});
/*点击修改网址事件*/

$('.siteModuleClass').on('click', 'li .siteMore', function (e) {
  e.stopPropagation(); //js阻止li的事件冒泡

  var li = $(this).parent().parent()[0];
  var liIndex = $('.siteList li').index(li);
  var hashMap = hashGroupMap[curGroupIndex].hashMap;
  layer.open({
    type: 1,
    title: '修改网址导航',
    skin: 'myskin',
    //加上边框
    area: ['350px', '250px'],
    //宽高
    shade: [0.8, '#393D49'],
    content: "\n        <div class=\"midifyWebSite\">\n            <div class=\"modifyFrame\">\n                <div class=\"mofifyName\">\u540D\u79F0</div>\n                <input type=\"text\" class=\"name\" value=".concat($(this).siblings('.siteName').text(), ">\n                <div class=\"mofifyName\">\u7F51\u5740 </div>\n                <input type=\"text\" class=\"site\" value=").concat($(this).data('url'), ">\n            </div>\n        </div>\n        "),
    btn: ['删除', '完成'],
    yes: function yes(index, layero) {
      hashMap.splice(liIndex, 1);
      render();
      layer.close(index);
    },
    btn2: function btn2(index, layero) {
      var name = $('.modifyFrame .name').val();
      var url = $('.modifyFrame .site').val();

      if (url.indexOf('http') !== 0) {
        url = "https://" + url;
      }

      hashMap[liIndex].url = url;
      hashMap[liIndex].siteName = name;
      render();
      layer.close(index);
    }
  });
});
/*离开页面前存储数据*/

/*window.onbeforeunload = ()=>{
    const hashString1 = JSON.stringify(hashGroupMap);
    const hashString2 = JSON.stringify(curGroupIndex);
    localStorage.setItem('hashGroupMap',hashString1);
    localStorage.setItem('curGroupIndex',hashString2)
}*/
},{}],"C:/Users/Administrator/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55746" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map