var url = "https://webmail.numericable.fr/";

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.sync.get(["identifiant", "domaine", "motdepasse"], function(opts) {
        if(opts.identifiant == void 0 || opts.domaine == void 0 || opts.motdepasse == void 0) {
            alert("Impossible de s'authentifier, merci de renseigner tous les champs");
            chrome.tabs.create({url: "options.html"});
            return;
        }
        
        options = opts;
        //alert(options.identifiant + " - " + options.domaine + " - " + options.motdepasse);

        chrome.tabs.create({url : url}, function(tab) {
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                if(changeInfo.status != "complete" || url != tab.url)
                    return;
                
                //alert(url + '\n' + tab.url);
                
                chrome.tabs.executeScript(tab.id, {
                    code : '/*document.body.style.background="red";*/' +
                        'document.querySelector("#id_login").value ="' + opts.identifiant + '";' + 
                        'document.querySelector("#id_domain").value = "' + opts.domaine + '";'+
                        'document.querySelector("#id_pwd").value = "' + opts.motdepasse + '";'+
                        'document.querySelector("form[name=\'ident\']").submit();'
                });
            });
        });
    });
});

