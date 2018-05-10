let htmlFile=document.getElementById('htmlFile');

htmlFile.onchange=function(activeTab){
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
    let totalElements=document.getElementsByClassName(arg).length;
    let arrayElements="";
    for(let compteur=0;compteur<totalElements;compteur++){
        let urlFromHtml=document.getElementsByClassName(arg)[compteur].getAttribute('href');
        let linkText=document.getElementsByClassName(arg)[compteur].text;
        let linkDataActionDetail=document.getElementsByClassName(arg)[compteur].getAttribute('data-action-detail');
        if(urlFromHtml!='javascript:void(0)'){
            let tempVar="";
            if(document.getElementById("optionLinkLabel").checked)tempVar=linkText+" | "
            tempVar=tempVar+urlFromHtml;
            if(document.getElementById("optionDataActionDetail").checked)tempVar=tempVar+" | "+linkDataActionDetail
            arrayElements=arrayElements+"<p>"+tempVar+"</p>";
            if(document.getElementById("optionOpenUrlsOn").checked){
                //console.log("Option Open Urls ON :"+compteur);
                openPage(urlFromHtml);
            }
            console.log(countElementCompleted(compteur,totalElements));
        }
    }
    console.log('Completed');
    document.getElementById("total-count").innerHTML=totalElements-1;
    document.getElementById("list-urls").innerHTML=arrayElements;
    copyElement(document.getElementById("list-urls"));
  }

const countElementCompleted=(indice, totalElement)=>{
    return ((indice*100)/totalElement);
}

const openPage=(urlIn)=>{
    chrome.tabs.create({ url: urlIn , selected: false});
    //console.log("url || "+urlIn+" || ok");
}

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
