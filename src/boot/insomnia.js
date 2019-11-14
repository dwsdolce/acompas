function Insomnia () {
}

Insomnia.prototype.keepAwake = function (successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, 'Insomnia', 'keepAwake', [])
}

Insomnia.prototype.allowSleepAgain = function (successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, 'Insomnia', 'allowSleepAgain', [])
}

Insomnia.install = function () {
  if (!window.plugins) {
    window.plugins = {}
  }

  window.plugins.insomnia = new Insomnia()
  return window.plugins.insomnia
}

if (typeof cordova !== 'undefined') {
  cordova.addConstructor(Insomnia.install)
  // Disable screen lock
  window.plugins.insomnia.keepAwake()
}
