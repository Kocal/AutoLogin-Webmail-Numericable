var url = 'https://webmail.numericable.fr/'

// On clear les données synchronisées, car elles sont désormais sauvegardées en local
chrome.storage.sync.get(['identifiant', 'domaine', 'motdepasse'], function (options) {
  if (options.identifiant || options.domaine || options.motdepasse) {
    alert(`Suite à une mise-à-jour importante de l'extension, vos informations de connexion ont été effacées.

Merci de les renseigner à nouveau.`)

    chrome.storage.sync.clear()
    chrome.tabs.create({url: 'options.html'})
  }
})

chrome.browserAction.onClicked.addListener(function () {
  chrome.storage.local.get(['identifier', 'domain', 'password'], function (options) {
    const identifier = options.identifier || false
    const domain = options.domain || false
    const password = options.password || false

    if (!identifier || !domain || !password) {
      alert("Impossible de s'authentifier, merci de renseigner tous les champs")
      chrome.tabs.create({url: 'options.html'})
      return
    }

    chrome.tabs.create({url: url}, function (createdTab) {
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, updatedTab) {
        if (createdTab.id != updatedTab.id)
          return

        chrome.tabs.executeScript(updatedTab.id, {
          code: `
            document.querySelector('#id_login').value = "${options.identifier}";
            document.querySelector('#id_domain').value = "${options.domain}";
            document.querySelector('#id_pwd').value = "${options.password}";
            document.querySelector('form[name="ident"]').submit();
           `
        })
      })
    })
  })
})
