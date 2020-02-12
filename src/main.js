/*const hashString = localStorage.getItem('hashMap');
const hashObject = JSON.parse(hashString);
const hashMap = hashObject || [
    {url: 'https://www.acfun.cn/', siteLogo: 'https://www.acfun.cn/favicon.ico', siteName:'AcFun'},
    {url: 'https://www.bilibili.com/',siteLogo: 'https://www.bilibili.com/favicon.ico',siteName: 'bilibili'}
];*/
const staticHashGroupMap = [
    {groupName: '娱乐', hashMap: [
        {url: 'https://www.acfun.cn/', siteLogo: 'https://www.acfun.cn/favicon.ico', siteName:'AcFun'},
        {url: 'https://www.bilibili.com/',siteLogo: 'https://www.bilibili.com/favicon.ico',siteName: 'bilibili'}
    ]},
    {groupName: '设计', hashMap: [
        {url: 'https://huaban.com/', siteLogo: 'https://huaban.com/favicon.ico', siteName:'花瓣网'},
        {url: 'https://www.zcool.com.cn/',siteLogo: 'https://www.zcool.com.cn/favicon.ico',siteName: '站酷'}
    ]},
    {groupName: '摄影', hashMap: []},
    {groupName: '绘画', hashMap: []},
];
const simplifyUrl = (url)=>{
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www', '')
    .replace(/\/.*/, ''); //正则表达式删除/后面内容
}

let lastSelect = 0;
let currentSelect = 0;

let startPos = 0;
let endPos = 5;

const hashString = localStorage.getItem('hashGroupMap');
const hashObject = JSON.parse(hashString);
const hashGroupMap = hashObject || staticHashGroupMap;

$(".siteGroupList").on('click','li:not(.groupLast)', function(){
    lastSelect = currentSelect;
    currentSelect = $(this).index();
    $(".siteGroupList li").each((index,node)=>{
        if(index === currentSelect){
            $(node).css('background','radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
        }
        else{
            $(node).css('background','none');
        }
    })
    siteRender();
})

/*分组列表刷新*/
const groupRender = (startPos, endPos)=>{
    const $groupList = $('.siteGroupList');
    let $lastGroup = $groupList.find('li.groupLast');
    $groupList.find('li:not(.groupLast)').remove();
    const groupLength = hashGroupMap.length;
    if(groupLength > endPos){
        for(let i = startPos; i <= endPos; i++){
            const $groupLi = $(`
            <li>${hashGroupMap[i].groupName}</li>
            `).insertBefore($lastGroup);
        }
    }
    else{
        for(let i = startPos; i < groupLength; i++){
            const $groupLi = $(`
            <li>${hashGroupMap[i].groupName}</li>
            `).insertBefore($lastGroup);
        }
    }
    /*hashGroupMap.forEach((node, index)=>{
        const $groupLi = $(`
            <li>${node.groupName}</li>
        `).insertBefore($lastGroup);
    });*/
}
groupRender(startPos, endPos);
$(".siteGroupList li:nth-child("+(currentSelect+1)+")").css('background','radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');

$('.siteGroupAll .Arrowleft').on('click',()=>{
    let length = hashGroupMap.length;
    if(startPos > 0){
        startPos -= 6;
        endPos -= 6;
    }
    groupRender(startPos, endPos);
    $(".siteGroupList li:nth-child("+(currentSelect+1)+")").css('background','radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
})
$('.siteGroupAll .Arrowright').on('click',()=>{
    let length = hashGroupMap.length
    if(endPos < length){
        startPos += 6;
        endPos += 6;
    }
    groupRender(startPos, endPos);
    $(".siteGroupList li:nth-child("+(currentSelect+1)+")").css('background','radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
})

/*网站列表刷新*/
const siteRender = ()=>{
    const $siteList = $(".siteList");
    let $last = $siteList.find("li.last");
    $siteList.find('li:not(.last)').remove();
    const $hashMap = hashGroupMap[currentSelect].hashMap;
    $hashMap.forEach((node, index)=>{
        const $li = $(`
            <li>
                <div class="site">
                    <div class="siteLogo">
                        <img src="${node.siteLogo}" alt="${simplifyUrl(node.url)[0]}" title="${node.siteName}" width='24px' height='24px'>
                    </div>
                    <div class="siteName">${node.siteName}</div>
                    <div class="siteMore">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-more"></use>
                        </svg>
                    </div>
                </div>
            </li>
        `).insertBefore($last);
        $li.on('click', ()=>{
            window.open(node.url, '_self');//事件冒泡与a标签冲突，换点击事件
        })
        $li.on('click', '.siteMore',(e)=>{
            e.stopPropagation();//js阻止li的事件冒泡
            $hashMap.splice(index, 1);
            siteRender();
        })
    });
    $('.siteList > li').hover(
        function(){
            $(this).css('cursor','pointer');
            $(this).css('background','#f1f3f4');
            $(this).children().eq(0).children().eq(2).css('display','block');
        },
        function(){
            $(this).css('background','none');
            $(this).children().eq(0).children().eq(2).css('display','none');
        }
    )
}
siteRender();

$(".searchButton").on('click',()=>{
    $(".searchForm").submit();
});

/*添加网址函数*/
let addSite = ()=>{
    let url = window.prompt('请输入网址');
    let name = window.prompt('请输入名称')
    if(url.indexOf('http') !== 0){
        url = "https://" + url;
    }
    const $hashMap = hashGroupMap[currentSelect].hashMap;
    $hashMap.push({
        url: url,
        siteLogo: url+'/favicon.ico',
        siteName: name
    })
    siteRender();
}

/*按钮——添加网址*/
$(".siteAddButton").on("click",addSite);

$('.buttonGroup.confirm').on('click',()=>{
    
})

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

/*$('.siteModule .siteMoudleName').on('click', ()=>{
    $('.siteModule .siteModuleClass').animate({
        height: 'toggle'
    },1000);
});*/

$('.settings').on('click',()=>{
    $('.modifyFrame').css('display','block');
    layer.open({
        type: 1,
        title: '添加网址导航',
        skin: 'layui-layer-rim', //加上边框
        area: ['350px', '250px'], //宽高
        shade: [0.8, '#393D49'],
        content: $('.midifyWebSite'),
        btn: ['删除','完成'],
        btnAlign: 'c',
        btn2: addSite,
        cancel:()=>{
            $('.modifyFrame').css('display','none');
        }
    });
});

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
});

/*切换分组*/
$('.siteModule .siteModuleGroup').hover(
    function(){
        $(this).children().eq(1).children('.groupArrow').css('display','block');
    },
    function(){
        $(this).children().eq(1).children('.groupArrow').css('display','none');
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

/*添加分组*/
$('.siteGroupList .groupLast').on('click',()=>{
    let name = window.prompt('请输入组名');
    if(name !== null){
        hashGroupMap.push({
            groupName: name,
            hashMap: []
        });
        groupRender(startPos, endPos);
        $(".siteGroupList li:nth-child("+(currentSelect+1)+")").css('background','radial-gradient(circle, rgba(228,228,228,1) 0%, rgba(87,155,235,1) 100%)');
        siteRender();
    }
})

/*离开页面前存储数据*/
/*window.onbeforeunload = ()=>{
    const hashString = JSON.stringify(hashGroupMap);
    localStorage.setItem('hashGroupMap',hashString);
}*/