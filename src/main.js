const staticHashGroupMap = [
    {groupName: '娱乐', hashMap: [
        {url: 'https://www.acfun.cn/', siteLogo: 'https://www.acfun.cn/favicon.ico', siteName:'AcFun'},
        {url: 'https://www.bilibili.com/',siteLogo: 'https://www.bilibili.com/favicon.ico',siteName: 'bilibili'}
    ], isActive: 'active'},
    {groupName: '设计', hashMap: [
        {url: 'https://huaban.com/', siteLogo: 'https://huaban.com/favicon.ico', siteName:'花瓣网'},
        {url: 'https://www.zcool.com.cn/',siteLogo: 'https://www.zcool.com.cn/favicon.ico',siteName: '站酷'}
    ], isActive:''}
];

/*从localStorage取出数据*/
const hashString1 = localStorage.getItem('hashGroupMap');
const hashObject = JSON.parse(hashString1);
const hashGroupMap = hashObject || staticHashGroupMap;

const hashString2 = localStorage.getItem("curGroupIndex");
const hashNumber = Number(hashString2);
let curGroupIndex = hashNumber; //当前选中的分组

let startPos = 0;
let endPos = 5;

/*简化Url*/
const simplifyUrl = (url)=>{
    return url.replace('https://', '')
              .replace('http://', '')
              .replace('www', '')
              .replace(/\/.*/, ''); //正则表达式删除/后面内容
}

let render;

const is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
if (is_mobi) {
    console.log('mobile');
    render = ()=>{
        hashGroupMap.forEach(($hashNode, index)=>{
            const $siteList = $(".siteList");
            const $last = $siteList.find("li.last");
            $siteList.find('li:not(.last)').remove();
            const hashMap = $hashNode.hashMap;
            hashMap.forEach((node, index)=>{
                const $li = $(`
                    <li title="${node.siteName}">
                        <div class="site">
                            <div class="siteLogo">
                                <img src="${node.siteLogo}" width='24px' height='24px'>
                            </div>
                            <div class="siteName">${node.siteName}</div>
                            <div class="siteMore" data-url="${node.url}">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-more"></use>
                                </svg>
                            </div>
                        </div>
                    </li>
                `).insertBefore($last);
            });
        })
    }
}else{
    /*页面刷新*/
    console.log('PC')
    render = ()=>{
        const $groupList = $('.siteGroupList');
        let $lastGroup = $groupList.find('li.groupLast');
        $groupList.find('li:not(.groupLast)').remove();
        hashGroupMap.forEach(function($hashNode, index){
            if(index >= startPos && index <= endPos){
                //渲染当前分组
                const $groupLi = $(`
                <li title="${$hashNode.groupName}">${$hashNode.groupName}</li>
                `).insertBefore($lastGroup); 
                const liNode = $('.siteGroupList li').eq(index - startPos);
                //渲染当前分组内容
                if($hashNode.isActive){
                    liNode.addClass('active');
                    let outIndex = index;
                    curGroupIndex = index;
                    const $siteList = $(".siteList");
                    const $last = $siteList.find("li.last");
                    $siteList.find('li:not(.last)').remove();
                    const hashMap = $hashNode.hashMap;
                    hashMap.forEach((node, index)=>{
                        const $li = $(`
                            <li title="${node.siteName}">
                                <div class="site">
                                    <div class="siteLogo">
                                        <img src="${node.siteLogo}" width='24px' height='24px'>
                                    </div>
                                    <div class="siteName">${node.siteName}</div>
                                    <div class="siteMore" data-url="${node.url}">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-more"></use>
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        `).insertBefore($last);
                    });
                }
                else{
                    if(liNode.hasClass('active')){
                        liNode.removeClass('active');
                    }
                }
            }
        })
    }
    render();
    /*分组左右箭头点击事件*/
    let leftFun = ()=>{
        let width =$('.siteGroupList').css('width');
        if(startPos > 0){
            startPos -= 6;
            endPos -= 6;
            render();
        }
    }
    $('.siteGroupAll .Arrowleft').on('click',()=>{
        leftFun();
    })
    let rightFun = ()=>{
        let length = hashGroupMap.length;
        if(endPos <= length - 1){
            startPos += 6;
            endPos += 6;
            render();
        }
    }
    $('.siteGroupAll .Arrowright').on('click',()=>{
        rightFun();
    })

    /*键盘事件*/
    $(document).on('keydown', (e)=>{
        if(e.ctrlKey){
            if(e.key === "ArrowUp"){
                $('.globalMain').animate({
                    height: 'toggle'
                },500);
            }
            else if(e.key === "ArrowDown"){
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h); 
            }
        }
        if(e.key === 'x'){
            logoFun();
        }
        if(e.key === 'ArrowLeft'){
            if( curGroupIndex - startPos >= 0){
                hashGroupMap.forEach((node,index)=>{
                    if( index === curGroupIndex && curGroupIndex > 0){
                        node.isActive = ''
                    }
                    else if(index === (curGroupIndex-1) && curGroupIndex > 0){
                        node.isActive = 'active'
                    }
                })
                if(curGroupIndex%6 === 0){
                    leftFun();
                    /*缺少一种情况，即在新的一页只有add分组时*/
                }
                else{
                    render();
                }
            }
            else{
                leftFun();
            }
        }
        if(e.key === 'ArrowRight'){
            const length = hashGroupMap.length;
            hashGroupMap.forEach((node,index)=>{
                if( index === curGroupIndex && curGroupIndex < length-1){
                    node.isActive = ''
                }
                else if(index === (curGroupIndex+1) && curGroupIndex < length-1){
                    node.isActive = 'active'
                }
            })
            if(curGroupIndex%6 === 5){
                rightFun();
            }
            else{
                render();
            }
        }
    });

    /*切换分组*/
    $('.siteModule .siteModuleGroup').hover(
        function(){
            $(this).children().eq(1).children('.groupArrow').addClass('active');
        },
        function(){
            $(this).children().eq(1).children('.groupArrow').removeClass('active');
        }
    )
    $('.siteGroupAll .Arrowleft').hover(
        function(){
            $(this).find('use').attr('xlink:href','#icon-left-colored');
        },function(){
            $(this).find('use').attr('xlink:href','#icon-left');
        }
    )
    $('.siteGroupAll .Arrowright').hover(
        function(){
            $(this).find('use').attr('xlink:href','#icon-right-colored');
        },
        function(){
            $(this).find('use').attr('xlink:href','#icon-right');
        }
    )
}

/*切换搜索引擎logo*/
let isLogoUp = true;
let $global = $(".globalHeader");
let $logo = $(".globalHeader .searchLogo");
let logoFun = ()=>{
    if(isLogoUp){
        $global.find('img').attr('src','./images/google.png');
        $global.find('form').attr('action','https://www.google.com.hk/search');
        $global.find('input').attr('name','q');
        isLogoUp = false;
    } 
    else{
        $global.find('img').attr('src','./images/baidu.png');
        $global.find('form').attr('action','https://www.baidu.com/s');
        $global.find('input').attr('name','wd');
        isLogoUp = true;
    }
}
$logo.on('click', logoFun);

/*搜索按钮点击事件*/
$(".searchButton").on('click',()=>{
    $(".searchForm").submit();
});

/*国内外网站切换按钮*/
let isSwitchOn = true;
let $switch = $('.siteModuleGroup .siteSwitch');
let switchFun = ()=>{
    if(isSwitchOn){
        $switch.find('use').attr('xlink:href','#icon-switch-off');
        isSwitchOn = false;
    }
    else{
        $switch.find('use').attr('xlink:href','#icon-switch-on');
        isSwitchOn = true;
    }
}
$switch.on('click', switchFun);

/*添加分组按钮点击事件*/
$('.siteGroupList .groupLast').on('click',()=>{
    layer.open({
        type: 1,
        title: '添加分组',
        skin: 'myskin', //加上边框
        area: ['350px', '180px'], //宽高
        shade: [0.8, '#393D49'],
        content: `
        <div class="midifyWebSite">
            <div class="modifyFrame">
                <div class="mofifyName">名称</div>
                <input type="text" class="name">
            </div>
        </div>
        `,
        btn: ['完成'],
        yes: function(index, layero){
            let name = $('.modifyFrame .name').val();
            if(name !== null){
                hashGroupMap.push({
                    groupName: name,
                    hashMap: []
                });
                render();
            }
            layer.close(index);
        }
    });
})

/*分组的鼠标右单击修改分组信息*/
$(document).on('contextmenu','.siteGroupList li', function(e){
    e.preventDefault();
    const liNode = $('.siteGroupList li').eq(curGroupIndex - startPos);
    if(this === liNode[0]){
        layer.open({
            type: 1,
            title: '修改分组信息',
            skin: 'myskin', //加上边框
            area: ['350px', '180px'], //宽高
            shade: [0.8, '#393D49'],
            content: `
            <div class="midifyWebSite">
                <div class="modifyFrame">
                    <div class="mofifyName">名称</div>
                    <input type="text" class="name" value=${liNode[0].textContent}>
                </div>
            </div>
            `,
            btn: ['删除','完成'],
            yes: function(index, layero){
                hashGroupMap.splice(curGroupIndex, 1);
                hashGroupMap[0].isActive = "active";
                curGroupIndex = 0;
                render();
                layer.close(index);
            },
            btn2: function(index, layero){
                let name = $('.modifyFrame .name').val();
                hashGroupMap[curGroupIndex].groupName = name;
                render();
                layer.close(index);
            }
        });
    }
})

/*非添加分组按钮点击事件*/
$(document).on('click','.siteGroupList li:not(.groupLast)', function(){
    let liIndex = ($('.siteGroupList li')).index(this) + startPos;
    hashGroupMap.forEach(($hashNode, index)=>{
        $hashNode.isActive = '';
        if(index === liIndex){
            $hashNode.isActive = 'active';
        }
    })
    render();
})

/*添加网址导航*/
$('.siteAddButton').on('click',()=>{
    layer.open({
        type: 1,
        title: '添加网址导航',
        skin: 'myskin', //加上边框
        area: ['350px', '250px'], //宽高
        shade: [0.8, '#393D49'],
        content: `
        <div class="midifyWebSite">
            <div class="modifyFrame">
                <div class="mofifyName">名称</div>
                <input type="text" class="name">
                <div class="mofifyName">网址 </div>
                <input type="text" class="site">
            </div>
        </div>
        `,
        btn: ['完成'],
        yes: function(index, layero){
            let name = $('.modifyFrame .name').val();
            let url = $('.modifyFrame .site').val();
            if(url.indexOf('http') !== 0){
                url = "https://" + url;
            }
            let hashMap;
            hashGroupMap.forEach(($hashNode)=>{
                if($hashNode.isActive === 'active'){
                    hashMap = $hashNode.hashMap;
                }
            })
            hashMap.push({
                url: url,
                siteLogo: url+'/favicon.ico',
                siteName: name
            })
            render();
            layer.close(index);
        }
    });
});

/*网址鼠标移入移出事件*/
$('.siteModuleClass').on('mouseenter','li', function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(this).children().eq(0).children().eq(2).addClass('active');
    }
)
$('.siteModuleClass').on('mouseleave','li', function(){
        $(this).removeClass('active');
        $(this).children().eq(0).children().eq(2).removeClass('active');
    }
)//绑定hover事件不成功，换绑定双事件

/*网址点击跳转*/
$('.siteModuleClass').on('click','li', function(e){
    window.open($(this).find('.siteMore').data('url'), '_self');
})

/*点击修改网址事件*/
$('.siteModuleClass').on('click','li .siteMore', function(e){
    e.stopPropagation();//js阻止li的事件冒泡
    const li = $(this).parent().parent()[0];
    const liIndex = $('.siteList li').index(li);
    const hashMap = hashGroupMap[curGroupIndex].hashMap;
    layer.open({
        type: 1,
        title: '修改网址导航',
        skin: 'myskin', //加上边框
        area: ['350px', '250px'], //宽高
        shade: [0.8, '#393D49'],
        content: `
        <div class="midifyWebSite">
            <div class="modifyFrame">
                <div class="mofifyName">名称</div>
                <input type="text" class="name" value=${$(this).siblings('.siteName').text()}>
                <div class="mofifyName">网址 </div>
                <input type="text" class="site" value=${$(this).data('url')}>
            </div>
        </div>
        `,
        btn: ['删除','完成'],
        yes: function(index, layero){
            hashMap.splice(liIndex, 1);
            render();
            layer.close(index);
        },
        btn2: function(index, layero){
            let name = $('.modifyFrame .name').val();
            let url = $('.modifyFrame .site').val();
            if(url.indexOf('http') !== 0){
                url = "https://" + url;
            }
            hashMap[liIndex].url = url;
            hashMap[liIndex].siteName = name;
            render();
            layer.close(index);
        }
    });
})

/*离开页面前存储数据*/
window.onbeforeunload = ()=>{
    const hashString1 = JSON.stringify(hashGroupMap);
    const hashString2 = JSON.stringify(curGroupIndex);
    localStorage.setItem('hashGroupMap',hashString1);
    localStorage.setItem('curGroupIndex',hashString2)
}
