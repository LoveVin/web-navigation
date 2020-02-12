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
})({"epB2":[function(require,module,exports) {
/*const hashString = localStorage.getItem('hashMap');
const hashObject = JSON.parse(hashString);
const hashMap = hashObject || [
    {url: 'https://www.acfun.cn/', siteLogo: 'https://www.acfun.cn/favicon.ico', siteName:'AcFun'},
    {url: 'https://www.bilibili.com/',siteLogo: 'https://www.bilibili.com/favicon.ico',siteName: 'bilibili'}
];*/
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
  }]
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
  }]
}, {
  groupName: '摄影',
  hashMap: []
}, {
  groupName: '绘画',
  hashMap: []
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www', '').replace(/\/.*/, ''); //正则表达式删除/后面内容
};

var lastSelect = 0;
var currentSelect = 0;
var startPos = 0;
var endPos = 5;
var hashString = localStorage.getItem('hashGroupMap');
var hashObject = JSON.parse(hashString);
var hashGroupMap = hashObject || staticHashGroupMap;
$(".siteGroupList").on('click', 'li:not(.groupLast)', function () {
  lastSelect = currentSelect;
  currentSelect = $(this).index();
  $(".siteGroupList li").each(function (index, node) {
    if (index === currentSelect) {
      $(node).css('background', 'radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
    } else {
      $(node).css('background', 'none');
    }
  });
  siteRender();
});
/*分组列表刷新*/

var groupRender = function groupRender(startPos, endPos) {
  var $groupList = $('.siteGroupList');
  var $lastGroup = $groupList.find('li.groupLast');
  $groupList.find('li:not(.groupLast)').remove();
  var groupLength = hashGroupMap.length;

  if (groupLength > endPos) {
    for (var i = startPos; i <= endPos; i++) {
      var $groupLi = $("\n            <li>".concat(hashGroupMap[i].groupName, "</li>\n            ")).insertBefore($lastGroup);
    }
  } else {
    for (var _i = startPos; _i < groupLength; _i++) {
      var _$groupLi = $("\n            <li>".concat(hashGroupMap[_i].groupName, "</li>\n            ")).insertBefore($lastGroup);
    }
  }
  /*hashGroupMap.forEach((node, index)=>{
      const $groupLi = $(`
          <li>${node.groupName}</li>
      `).insertBefore($lastGroup);
  });*/

};

groupRender(startPos, endPos);
$(".siteGroupList li:nth-child(" + (currentSelect + 1) + ")").css('background', 'radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
$('.siteGroupAll .Arrowleft').on('click', function () {
  var length = hashGroupMap.length;

  if (startPos > 0) {
    startPos -= 6;
    endPos -= 6;
  }

  groupRender(startPos, endPos);
  $(".siteGroupList li:nth-child(" + (currentSelect + 1) + ")").css('background', 'radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
});
$('.siteGroupAll .Arrowright').on('click', function () {
  var length = hashGroupMap.length;

  if (endPos < length) {
    startPos += 6;
    endPos += 6;
  }

  groupRender(startPos, endPos);
  $(".siteGroupList li:nth-child(" + (currentSelect + 1) + ")").css('background', 'radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
});
/*网站列表刷新*/

var siteRender = function siteRender() {
  var $siteList = $(".siteList");
  var $last = $siteList.find("li.last");
  $siteList.find('li:not(.last)').remove();
  var $hashMap = hashGroupMap[currentSelect].hashMap;
  $hashMap.forEach(function (node, index) {
    var $li = $("\n            <li>\n                <div class=\"site\">\n                    <div class=\"siteLogo\">\n                        <img src=\"".concat(node.siteLogo, "\" alt=\"").concat(simplifyUrl(node.url)[0], "\" title=\"").concat(node.siteName, "\" width='24px' height='24px'>\n                    </div>\n                    <div class=\"siteName\">").concat(node.siteName, "</div>\n                    <div class=\"siteMore\">\n                        <svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-more\"></use>\n                        </svg>\n                    </div>\n                </div>\n            </li>\n        ")).insertBefore($last);
    $li.on('click', function () {
      window.open(node.url, '_self'); //事件冒泡与a标签冲突，换点击事件
    });
    $li.on('click', '.siteMore', function (e) {
      e.stopPropagation(); //js阻止li的事件冒泡

      $hashMap.splice(index, 1);
      siteRender();
    });
  });
  $('.siteList > li').hover(function () {
    $(this).css('cursor', 'pointer');
    $(this).css('background', '#f1f3f4');
    $(this).children().eq(0).children().eq(2).css('display', 'block');
  }, function () {
    $(this).css('background', 'none');
    $(this).children().eq(0).children().eq(2).css('display', 'none');
  });
};

siteRender();
$(".searchButton").on('click', function () {
  $(".searchForm").submit();
});
/*添加网址函数*/

var addSite = function addSite() {
  var url = window.prompt('请输入网址');
  var name = window.prompt('请输入名称');

  if (url.indexOf('http') !== 0) {
    url = "https://" + url;
  }

  var $hashMap = hashGroupMap[currentSelect].hashMap;
  $hashMap.push({
    url: url,
    siteLogo: url + '/favicon.ico',
    siteName: name
  });
  siteRender();
};
/*按钮——添加网址*/


$(".siteAddButton").on("click", addSite);
$('.buttonGroup.confirm').on('click', function () {});
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
/*$('.siteModule .siteMoudleName').on('click', ()=>{
    $('.siteModule .siteModuleClass').animate({
        height: 'toggle'
    },1000);
});*/

$('.settings').on('click', function () {
  $('.modifyFrame').css('display', 'block');
  layer.open({
    type: 1,
    title: '添加网址导航',
    skin: 'layui-layer-rim',
    //加上边框
    area: ['350px', '250px'],
    //宽高
    shade: [0.8, '#393D49'],
    content: $('.midifyWebSite'),
    btn: ['删除', '完成'],
    btnAlign: 'c',
    btn2: addSite,
    cancel: function cancel() {
      $('.modifyFrame').css('display', 'none');
    }
  });
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
});
/*切换分组*/

$('.siteModule .siteModuleGroup').hover(function () {
  $(this).children().eq(1).children('.groupArrow').css('display', 'block');
}, function () {
  $(this).children().eq(1).children('.groupArrow').css('display', 'none');
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
/*添加分组*/

$('.siteGroupList .groupLast').on('click', function () {
  var name = window.prompt('请输入组名');

  if (name !== null) {
    hashGroupMap.push({
      groupName: name,
      hashMap: []
    });
    groupRender(startPos, endPos);
    $(".siteGroupList li:nth-child(" + (currentSelect + 1) + ")").css('background', 'radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
    siteRender();
  }
});
/*离开页面前存储数据*/

/*window.onbeforeunload = ()=>{
    const hashString = JSON.stringify(hashGroupMap);
    localStorage.setItem('hashGroupMap',hashString);
}*/
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.72a74281.js.map