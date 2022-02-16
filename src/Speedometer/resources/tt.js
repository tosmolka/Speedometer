(function () {
  if (window.trustedTypes !== null && window.trustedTypes.defaultPolicy == null) {
    window.trustedTypes.createPolicy('default', {
      createHTML: (html) => { return html; },
      createScript: (script) => { return script; },
      createScriptURL: (scriptUrl) => { return scriptUrl; },
    });
  }
})();
