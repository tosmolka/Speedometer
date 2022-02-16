const mode = window?.document?.currentScript?.getAttribute('data-mode') || 'replace';

var newSuites = [];
for (var idx=0; idx<Suites.length; idx++) {
  if (mode == 'append') {
    newSuites.push(Suites[idx]);
  }
  const suite = Object.assign({}, Suites[idx]);
  suite.name += ' with TT';
  suite.url = String(suite.url).replace(/\.html$/, '-tt.html');
  newSuites.push(suite);
}
Suites = newSuites;
