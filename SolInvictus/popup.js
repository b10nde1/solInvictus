let btnSelectModeSiteMap=document.getElementById("sol-invictus-mode_sitemap");
let btnSelectModeUrl=document.getElementById("sol-invictus-mode_url");
let btnConfirm=document.getElementById('btn-confirm');

btnSelectModeSiteMap.onclick=function(activeTab){
    document.getElementById("mode-sitemap").style.display="block";
    document.getElementById("mode-url").style.display="none";
}

btnSelectModeUrl.onclick=function(activeTab){
    document.getElementById("mode-url").style.display="block";
    document.getElementById("mode-sitemap").style.display="none";
}

btnConfirm.onclick=function(activeTab){
    let market=document.getElementById("market").value;
    let environment=document.getElementById("environment").value;
    let returnUrl=urlMarket(market,environment);
    let result="";
    if(document.getElementById("optionSiteMap").checked){
        let returnSitemap=siteMap(returnUrl);
        result=result+'<p>'+returnSitemap+'</p>';
        openPage(returnSitemap);
    }
    if(document.getElementById("optionCodeHtml").checked){
        let returnHtml=htmlCode(returnUrl);
        result=result+'<p>'+returnHtml+'</p>';
        openPage(returnHtml);
    }
    if(document.getElementById("optionUrl").checked){
        result=result+'<p>'+returnUrl+'</p>';
        openPage(returnUrl);
    }
    displayResut(result);
}

const listUrl=()=>{
    return 'https://www.pampers.fr';
}

const urlMarket=(argMarket,argEnvironment)=>{
    console.log(argMarket+" "+argEnvironment);
    let listOfUrls=listUrl();
}

const siteMap=(arg)=>{return arg+'/sitemap.xml';}

const htmlCode=(arg)=>{return 'view-source:'+arg;}

const displayResut=(arg)=>{
    document.getElementById("result").innerHTML=arg;
    copyElement(document.getElementById("result"));
}

const openPage=(urlIn)=>{chrome.tabs.create({ url: urlIn , selected: false});}

const copyElement=(el)=>{
    let body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand("Copy");
}
