const hashString = localStorage.getItem('hashMap');
const hashObject = JSON.parse(hashString);
const hashMap = hashObject || [
    {url: 'https://www.acfun.cn/', siteLogo: 'A', siteName:'AcFun'},
    {url: 'https://www.bilibili.com/',siteLogo: 'B',siteName: 'bilibili'}
];
const simplifyUrl = (url)=>{
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www', '')
    .replace(/\/.*/, ''); //正则表达式删除/后面内容
}

/*页面刷新*/
const render = ()=>{
    const $siteList = $(".siteList");
    let $last = $siteList.find("li.last");
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`
            <li>
                <div class="site">
                    <div class="siteLogo">
                        ${simplifyUrl(node.siteLogo)[0]}
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
            hashMap.splice(index, 1);
            render();
        })
    });
}
render();
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
    hashMap.push({
        url: url,
        siteLogo: url,
        siteName: name
    })
    render();
}

/*按钮——添加网址*/
$(".siteAddButton").on("click",addSite);

$('.buttonGroup.confirm').on('click',()=>{
    
})

/*离开页面前存储数据*/
window.onbeforeunload = ()=>{
    const hashString = JSON.stringify(hashMap);
    localStorage.setItem('hashMap',hashString);
}

/*切换搜索引擎logo*/
let isLogoUp = true;
let $global = $(".globalHeader");
let $logo = $(".globalHeader .searchLogo");
let logoFun = ()=>{
    if(isLogoUp){
        $global.find('img').attr('src','/google.7c5fff2d.png');
        $global.find('form').attr('action','https://www.google.com.hk/search');
        $global.find('input').attr('name','q');
        isLogoUp = false;
    }
    else{
        $global.find('img').attr('src','/baidu.53ea9fd2.png');
        $global.find('form').attr('action','https://www.baidu.com/s');
        $global.find('input').attr('name','wd');
        isLogoUp = true;
    }
}
$logo.on('click', logoFun);

/*PC端*/
let isSwitchOn = true;
let $switch = $('.siteModule > .siteSwitch');
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

/*window.onclick = ()=>{
    console.log(layer.msg);
    layer.msg('玩命提示中');
}*/
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
