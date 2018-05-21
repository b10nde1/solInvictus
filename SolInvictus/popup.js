let btnSelectModeSiteMap=document.getElementById("sol-invictus-mode_sitemap");
let btnSelectModeUrl=document.getElementById("sol-invictus-mode_url");
let btnConfirm=document.getElementById('btn-confirm');
let siteMapFile=document.getElementById('siteMapFile');

siteMapFile.onchange=function(activeTab){
    let input = event.target;
    let reader = new FileReader();
    let searchKey=document.getElementById('searchKey').value;
    reader.onload = function(){
        let dataURL = reader.result;
        document.getElementById("code-to-scan").innerHTML=dataURL;
        scanDocument(searchKey);
    };
    let result = reader.readAsText(input.files[0]);
}

const scanDocument=(arg)=> {
    let listLoc=document.getElementsByTagName('loc');
    let result='';
    let total=0;
    let finalList=new Array(50);
    for(var compt=0;compt<listLoc.length;compt++){
        let temp=listLoc[compt].innerText;
        let check=temp.search(arg);
        if(check>=0){
            finalList[total]=temp;
            console.log(finalList[compt]);
            total+=1;
            result+='<p>'+temp+'</p>';
        }
    }
    if(document.getElementById('mode-sitemap_openUrlOn').checked)openLinkFromSiteMap(finalList,total)
    document.getElementById('mode-sitemap-result-urls').innerHTML=result;
    copyElement(document.getElementById('mode-sitemap-result-urls'));
    document.getElementById('total-count').innerHTML=total;
}

const openLinkFromSiteMap=(argListLink,argTotalCount)=>{
    if(argTotalCount<50){
        for(var compt=0;compt<argTotalCount;compt++){
            openPage(argListLink[0]);
        }
    }
}

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
    if(document.getElementById('optionErrorPagesActivation').checked){
        let tempListUrls=initListOfUrls(environment);
        for(var compt=0;compt<tempListUrls.length;compt++){
            let temp404=error404(tempListUrls[compt][1]);
            let temp500=error500(tempListUrls[compt][1]);
            let temp503=error503(tempListUrls[compt][1]);
            result+='<p>'+temp404+'</p><p>'+temp500+'</p><p>'+temp503+'</p>';
            openPage(temp404);openPage(temp500);openPage(temp503);
        }
        displayResut(result);
        return 0;
    }
    if(document.getElementById("optionSiteMap").checked){
        let returnSitemap=siteMap(returnUrl);
        result+='<p>'+returnSitemap+'</p>';
        openPage(returnSitemap);
    }
    if(document.getElementById("optionCodeHtml").checked){
        let returnHtml=htmlCode(returnUrl);
        result+='<p>'+returnHtml+'</p>';
        openPage(returnHtml);
    }
    if(document.getElementById("optionUrl").checked){
        result+='<p>'+returnUrl+'</p>';
        openPage(returnUrl);
    }
    if(document.getElementById("optionErrorPages404").checked){
        let temp404=error404(returnUrl);
        result+='<p>'+temp404+'</p>';
        openPage(temp404);
    }
    if(document.getElementById("optionErrorPages500").checked){
        let temp500=error500(returnUrl);
        result+='<p>'+temp500+'</p>'
        openPage(temp500);
    }
    if(document.getElementById("optionErrorPages503").checked){
        let temp503=error503(returnUrl);
        result+='<p>'+temp503+'</p>';
        openPage(temp503);
    }
    displayResut(result);
}

const initListOfUrls=(arg)=>{
    try{
        let listMarketsCD=[
            ['fr','https://www.pampers.fr'],['us_en','https://www.pampers.com'],
            ['ca_en','http://www.pampers.ca/en-ca/'],['br','http://www.pampers.com.br/'],
            ['ar','http://www.pampers.com.ar/'],['cl','http://www.pampers.cl/'],
            ['uk','http://www.pampers.co.uk/'],['de','https://www.pampers.de/'],
            ['ru','http://www.pampers-gorodok.ru/'],['tr','http://www.prima.com.tr/'],
            ['in','http://www.in.pampers.com/'],['za','http://www.pampers.co.za/'],
            ['ae','https://www.pampers.ae'],['sa_ar','http://www.pampersarabia.com/ar-sa/'],
            ['sa_en','http://www.pampersarabia.com/en-sa/'],['jp','http://www.jp.pampers.com/'],
            ['ph','https://www.pampers.ph/'],['pl','http://www.pampers.pl/'],
            ['dodot es','https://www.dodot.es'],['nl','http://www.pampers.nl/']];
        let listMarketsCM=[
            ['fr','https://author.pampers.fr.pgsitecore.com'],['us_en','https://author.pampers.com.pgsitecore.com'],
            ['ca_en','http://author.pampers.ca.pgsitecore.com/en-ca/'],['br','http://author.pampers.com.br.pgsitecore.com/'],
            ['ar','http://author.pampers.com.ar.pgsitecore.com/'],['cl','http://author.pampers.cl.pgsitecore.com/'],
            ['uk','http://author.pampers.co.uk.pgsitecore.com/'],['de','https://author.pampers.de.pgsitecore.com/'],
            ['ru','https://author.pampersgorodokru.pgsitecore.com'],['tr','http://author.prima.com.tr.pgsitecore.com/'],
            ['in','http://author.in.pampers.com.pgsitecore.com/'],['za','http://author.pampers.co.za.pgsitecore.com/'],
            ['ae','https://author.pampers.ae.pgsitecore.com'],['sa_ar','http://author.pampersarabia.com.pgsitecore.com/ar-sa/'],
            ['sa_en','http://author.pampersarabia.com.pgsitecore.com/en-sa/'],['jp','http://author.jp.pampers.com.pgsitecore.com/'],
            ['ph','https://author.pampers.ph.pgsitecore.com/'],['pl','http://author.pampers.pl.pgsitecore.com/'],
            ['dodot es','https://author.dodot.es.pgsitecore.com'],['nl','http://author.pampers.nl.pgsitecore.com/']];
        if(arg=='cd')return listMarketsCD;
        if(arg=='cm')return listMarketsCM;
    }
    catch(e){
        console.log('Error initListOfUrls() => '+e.message);
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

const siteMap=(arg)=>{return arg+'/sitemap.xml';}

const htmlCode=(arg)=>{return 'view-source:'+arg;}

const error404=(arg)=>{return arg+'/qwerty123';}

const error500=(arg)=>{return arg+'/error-500';}

const error503=(arg)=>{return arg+'/maintenance';}

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
