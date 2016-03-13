[![Build Status](https://travis-ci.org/makeus/DSP-Ex3.svg?branch=master)](https://travis-ci.org/makeus/DSP-Ex3)

# Distributed systems project, exercise 3

This was a project for [Distributed Systems Project Spring 2016](https://www.cs.helsinki.fi/courses/582665/2016/k/k/1). The assignment was to build a calculator that uses calculation and parsing in both client and server-side. Calculator was also supposed to handle input `sin(x)`.

## Solution

The assignent was to build a calculator to accept simple inputs like `1+2*3/4`. The order of calculation was supposed to be from left to right ` +` , `-` , `*` , `/` . This makes the calculator calculate wrong results. This was most likely done to prevent plagiarism and simplify the parsing. In the end, it made parsing harder since testing proper results was harder. Also the usage of the calculator in sin calculation proved challenging because of it.

The calculator was to use the server in calculation in simple expressions such as ` 1 + 2` . This meant that the parsing had to be done on client side. This also meant that the calculation is done asynchronously at every step.

The calculator was also supposed to be able to calculate `sin(x)`, where `x` is between ` [-π, π]`  with minium accuracy of 1%. The sine plot was to be rendered in three different ways; on the client locally, on the server and using co-operation. The first two proved to be simple since no asynchronicity is required. The third operation was supposed to use the calculator previously made. This made calculating the sin challenging. I used Taylor Series for sine to calculate this.

```
Taylor series
Y = X - X^3 / 3! + X^5 / 5! - ... + (-1)(n+1) * X^(2*n-1) / (2n-1)!
```

Taylor sine requires a `n` to be chosen, which determines the accuracy of the sine. Since the assignment required `sin(x)` to be rendered between ` [-π, π]` , `n` of 5 was chosen. The 1% accuracy requirement was checked with javascript unit tests calculating the difference between the sine and javascripts Math.sin.

The assignment had also a requirement to cache requests. This was done as a queue with a default size of 3000. Before each calculation cache is checked and result is used if found. After server response result is stored in the cache. 

A simplify function was also added. This simplifies the input based on results in the cache. Since the parsing on the input orders the calculation no effort was made to make the simplify smart. Eg. with ` 1 + 2 = 3`  in the cache, ` 2 + 1`  would not simplify to `3`. Also
` 2 + 4 = 6`  and ` 2 * 2 = 4`  would not cause ` 2 + 2 * 2 ` to simplify, since additions are parsed first. Since the calculation order is untraditional these cases are challenging to handle.


### Tools
The assignment had a requirement to only use jQuery on the client-side. Server-side the choice was free. I chose Ruby on Rails and the latest jQuery version (1.12). Rails since i felt like practicing it and its very simple to setup. In the end, little was done on the server-side, so in the end any other language/framework would've sufficed. [jQuerys Deferred](https://api.jquery.com/category/deferred-object/) proved to be invaluable in handling the asynchronicity.

Since no client side plugins for plotting were allowed, plotting was done by hand using canvas. This choice of requirement seemed odd, since i found the calculation of the plot points to be the most challenging part. Also the requirement of jQuery < 2 was oddly specific. 

### Problems

Most of the problems were with the input parsing and the sine calculation. The simple cases of the input were easy enough to manage. Splitting to operations and in order checking left and right and replacing them with operations proved simple enough. Negative numbers however proved to be trickier since the parsing considered them as operations. Parenthesis were also ignored to keep the parsing simple.

Sine calculation with Taylor series also caused some issues. I had prepared tests for the sine calculation. Due to asynchronicity of the calculation small mistakes in order or the addition and reduction of rounds caused debugging of the code to be challenging. Javascript scientific notation on small floats (eg. `1.2321554e-10`) also caused some issues since the calculator used strings as input.

### Notes

Each calculation caused a POST request to the server. POST requests are not cached by the browser so caching was only done manually. Sin(x) calculation caused a large amount of POST request to the server. With `n=3` ~20 POST requests and with `n=5` ~50 POST requests for each `x`. With `x` between `[-π, π]` with 0.1 step 63 `x` -values were calcuated. This sums up total of ~1200 POST requests for `n=3` and ~3150 for `n=5`. Caching was used to mitigate this. The table below describes the effect of different cache sizes. The time used is based on server running locally and is a rough estimate only (javascript + browser render times vary).


![Requests per cache size](http://chart.apis.google.com/chart?chtt=Request+per+cache+size&chts=000000,12&chs=700x200&chf=bg,s,ffffff|c,s,ffffff&chxt=x,y&chxl=0:|0|100|200|300|400|500|600|700|800|900|1000|1100|1200|1300|1400|1500|1600|1:|2,364.00|2,806.00|3,248.00&cht=lxy&chd=t:0.00,6.25,12.50,18.75,25.00,31.25,37.50,43.75,50.00,56.25,62.50,68.75,75.00,81.25,87.50,93.75,100.00|100.00,96.38,96.38,89.36,78.50,77.37,64.36,37.66,32.12,32.12,32.12,25.11,17.87,10.85,0.00,0.00,0.00&chdl=requests&chco=0000ff "Requests per cache size")

| Cache-size | Requests  | Time  |
| ---------- |:---------:| -----:|
| 10000      | 2364      | 25s   |
| 3000       | 2364      | 25s   |
| 1500       | 2364      | 25s   |
| 1400       | 2364      | 25s   |
| 1300       | 2460      | 26s   |
| 1200       | 2522      | 27s   |
| 1100       | 2586      | 27s   |
| 1000       | 2648      | 29s   |
| 900        | 2648      | 28s   |
| 800        | 2648      | 28s   |
| 700        | 2697      | 28s   |
| 600        | 2933      | 31s   |
| 500        | 3048      | 32s   |
| 400        | 3058      | 32s   |
| 300        | 3154      | 33s   |
| 200        | 3216      | 34s   |
| 100        | 3216      | 34s   |
| 0          | 3248      | 34s   |

It can be noted that the request amount reaches a minimum of 2364 at around 1400 cache size at around 25 seconds. It can be also noted that since the HTTP request times vary the number of cache hits vary. At higher cache sizes this variance is higher as can be seen from the graph. At 700 cache size there were more requests than at lower cache size 600.

## Setup

The software requires dependencies to be installed first. You can do this by running

```
bundle install
```

The rails server can be started with

```
rails server -e production
```

### Testing

Javascript tests can be found at route `/test`. They can also be run at console with `rake konacha:run`. This however requires firefox and a headless configuration if run on a server.

Capybara tests can be run with `rake rspec`. This also requires firefox and a headless configuration to run.

## Demo

Travis-CI: [https://travis-ci.org/makeus/DSP-Ex3](https://travis-ci.org/makeus/DSP-Ex3)

Heroku: [https://dsp-ex3.herokuapp.com/](https://dsp-ex3.herokuapp.com/)
