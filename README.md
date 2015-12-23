# sauce-lab
[![Build Status](https://img.shields.io/travis/jepso-ci/sauce-lab/master.svg)](https://travis-ci.org/jepso-ci/sauce-lab)
[![Dependency Status](https://img.shields.io/david/jepso-ci/sauce-lab.svg)](https://david-dm.org/jepso-ci/sauce-lab)

  Run a single test file on sauce labs.  This just takes care of polling for the result.

## Run(config)

Config should have the following properties...

Authenitcation:

 - **user** - the user on sauce labs
 - **key** - the key on sauce labs

Test:

 - **browser** - the exact browser & version to test on
 - **url** - the url of the test page
 - **code** - the code to execute on the page for each poll.
 - **parse** - a function that gets called with the result of executing code, it should return null untill the test is complete, at which point it should return the result of the test.

Logging:

 - **name** - the name of the test
 - **tags** - an array of tags for the test
