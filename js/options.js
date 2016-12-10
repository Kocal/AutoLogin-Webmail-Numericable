const $form = document.querySelector('form#options_connexion')
const $identifier = $form.querySelector('#input_identifier')
const $domain = $form.querySelector('#input_domain')
const $password = $form.querySelector('#input_password')

chrome.storage.local.get(['identifier', 'domain'], function (options) {
  $identifier.value = options.identifier || options.identifiant || ''
  $domain.value = options.domain || options.domaine || ''
})

$form.addEventListener('submit', function (e) {
  e.preventDefault()

  if (!$identifier.value || !$domain.value || !$password.value) {
    alert('Merci de renseigner tous les champs !')
    return
  }

  chrome.storage.local.set({
    identifier: $identifier.value,
    domain: $domain.value,
    password: $password.value,
  }, function () {

    chrome.storage.local.get(['identifier', 'domain', 'password'], function (options) {
      if (options.identifier == $identifier.value
        && options.domain == $domain.value
        && options.password == $password.value) {
        alert('Les options ont bien étés sauvegardées !')

        chrome.tabs.getCurrent(function(tab) {
          chrome.tabs.remove(tab.id)
        })

      } else {
        alert("Une erreur s'est produite lors de la sauvegarde des options.")
      }
    })
  })

}, false)
