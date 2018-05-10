let btnSelectModeSiteMap=document.getElementById("sol-invictus-mode_sitemap");
let btnSelectModeUrl=document.getElementById("sol-invictus-mode_url");
let btnConfirm=document.getElementById('btn-confirm');
let siteMapFile=document.getElementById('siteMapFile');

/* */
siteMapFile.onchange=function(activeTab){
    
}
/* */

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

/* */
const initListOfUrls=(arg)=>{
    try{
        let listMarketsCD=[['fr','https://www.pampers.fr'],['us_en','https://www.pampers.com']];
        let listMarketsCM=[['fr','https://author.pampers.fr.pgsitecore.com'],['us_en','https://author.pampers.com.pgsitecore.com']];
        if(arg=='cd')return listMarketsCD;
        if(arg=='cm')return listMarketsCM;
    }
    catch(e){
        console.log('Error initListOfUrls');
    }
}

const searchMarket=(argList,argMarket)=>{
    let result='';
    for(var compt=0;compt<argList.length;compt++){
        if(argList[compt][0]==argMarket){
            result=argList[compt][1];
            break;
        }
    }
    return result;
}

const urlMarket=(argMarket,argEnvironment)=>{
    let resultUrl=searchMarket(initListOfUrls(argEnvironment),argMarket);
    return resultUrl;
}
/* */

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
