# Speedometer

This is a fork of https://github.com/WebKit/WebKit/tree/main/PerformanceTests/Speedometer that runs 
performance tests with enforced Trusted Types (https://w3c.github.io/webappsec-trusted-types/dist/spec/). 

The main purpose of this project is to measure performance impact of enfocing Trusted Types in couple of 
standard sample apps. Data from such test runs will then be analysed to test hypothesis that enforcement of 
Trusted Types has negligible impact on app performance. 

## Sample Usage

```bash
# Get this project
git clone https://github.com/tosmolka/Speedometer.git
cd Speedometer

# Install dependencies
yarn install
...

# Build
yarn run build
...

# Start serving files via http://localhost:8088
yarn run serve
```

```bash
# Open new terminal and run test against http://localhost:8088/Speedometer/index.html and http://localhost:8088/Speedometer/index-tt.html
>yarn run test
yarn run v1.22.5
$ node scripts/test.js

DevTools listening on ws://127.0.0.1:54488/devtools/browser/53b6eed9-1ac3-4414-b953-d09137f80af6
Browser: chrome, Trusted Types: false, Score: 165 ± 2.4 (1.5%), Heap: Min: 2.55 MB, Max: 68.7 MB, Mean: 34.6 MB, StDev: 12.2 MB

DevTools listening on ws://127.0.0.1:54511/devtools/browser/80d5b8be-e4e5-4849-9ee5-681de83180e9
Browser: chrome, Trusted Types: true, Score: 161 ± 2.8 (1.7%), Heap: Min: 3.37 MB, Max: 57.9 MB, Mean: 37.6 MB, StDev: 9.02 MB
Done in 79.56s.
```
