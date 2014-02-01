# SingSpark
### A twitter bot that will send notes to a Spark device and make it sing (piezo speaker not included)

1. For wiring, I'm using an example from [SparkFun](http://sparkfun.com). See [this diagram](http://ardx.org/src/circ/CIRC06-sheet-SPAR.pdf). I'm using pin D0 on the Spark. 
2. Copy paste musicFunction.cpp into the spark builder and flash it to your spark. (The code is from [here](http://ardx.org/src/circ/CIRC06-code.txt))
3. Get the Spark device ID and access token.
4. Make a twitter app and get the credentials for that (See [ExampleBot](https://github.com/dariusk/examplebot) for details)
5. Edit sparkConfig.js and twitterConfig.js with the details
6. Run bot.js

##### Thanks to [ExampleBot](https://github.com/dariusk/examplebot) that helped me figure out the twitter bot part
##### Also thanks to [rwaldron's spark-io project](https://github.com/rwaldron/spark-io) (Even though I didn't end up using it)
##### Also be sure to check out [Spark's documentation on functions](https://github.com/spark/docs/blob/master/docs/api.md) to really make things awesome

