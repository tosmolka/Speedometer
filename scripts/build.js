const fs = require('fs');
const jsdom = require("jsdom");
const path = require('path');

const resourcesPath = path.join(__dirname, '../src/Speedometer/resources');

{
    const htmlPath = path.join(resourcesPath, '../index.html');
    let htmlSource = fs.readFileSync(htmlPath, 'utf8');
    
    const ttHtmlPath = htmlPath.replace(/\.html$/, '-tt.html');

    let dom = new jsdom.JSDOM(htmlSource);
    let doc = dom.window.document;
    let serializedSource = dom.serialize();
    if (serializedSource != htmlSource) {
        console.log(`writing to ${htmlPath}`);
        fs.writeFileSync(htmlPath, serializedSource, {encoding: 'utf8'});    
    }

    const ttTestsPath = path.join(resourcesPath, 'tests-tt.js');
    const ttTestsEl = doc.createElement('script');
    ttTestsEl.setAttribute('src', path.relative(path.dirname(ttHtmlPath), ttTestsPath).replace(/\\/, '/'));
    ttTestsEl.setAttribute('defer', '');
    dom.window.document.head.append(ttTestsEl);

    console.log(`writing to ${ttHtmlPath}`);
    fs.writeFileSync(ttHtmlPath, dom.serialize(), {encoding: 'utf8'});
}

let testsCode = fs.readFileSync(path.join(resourcesPath, 'tests.js'), 'utf8');
const ttScriptPath = path.join(resourcesPath, 'tt.js');

var Suites = (function () {
    var BenchmarkTestStep = function () {};
    eval(testsCode);
    return Suites;
})();

Suites.forEach((suite) => {
    let suiteUrl = String(suite.url);
    if (!suiteUrl.endsWith('.html')) {
        return;
    }
    const suiteIndexPath = path.join(resourcesPath, suiteUrl);

    let suiteIndexSource = fs.readFileSync(suiteIndexPath, 'utf8');
    let dom = new jsdom.JSDOM(suiteIndexSource);
    let doc = dom.window.document;
    let serializedIndexSource = dom.serialize();
    if (serializedIndexSource != suiteIndexSource) {
        console.log(`writing to ${suiteIndexPath}`);
        fs.writeFileSync(suiteIndexPath, serializedIndexSource, {encoding: 'utf8'});    
    }

    const ttSuiteIndexPath = suiteIndexPath.replace(/\.html$/, '-tt.html');
    // if (fs.existsSync(ttSuiteIndexPath)) {
    //     console.log(`removing ${ttSuiteIndexPath}`);
    //     fs.unlinkSync(ttSuiteIndexPath);
    // }

    const ttScriptEl = doc.createElement('script');
    ttScriptEl.setAttribute('src', path.relative(path.dirname(ttSuiteIndexPath), ttScriptPath).replace(/\\/, '/'));
    dom.window.document.head.prepend(ttScriptEl);

    const cspHeaderMeta = doc.createElement('meta');
    cspHeaderMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    cspHeaderMeta.setAttribute('content', "trusted-types default; require-trusted-types-for 'script';");
    dom.window.document.head.prepend(cspHeaderMeta);
    
    console.log(`writing to ${ttSuiteIndexPath}`);
    fs.writeFileSync(ttSuiteIndexPath, dom.serialize(), {encoding: 'utf8'});
})
