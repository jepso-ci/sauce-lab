require('mocha-as-promised')();
var run = require('../');
var assert = require('assert');

describe('run', function () {
  it('runs tests in the browser', function () {
    this.timeout(200000);
    return run({
      user: 'sauce-runner',
      key: 'c71a5c75-7c28-483f-9053-56da13b40bc2',

      browser: {},

      url: 'https://jepso-ci.com/api/proxy/jepso-ci-examples/minimum/master/test.html',
      code: '"abcdefg"',
      parse: function (res) {
        return typeof res === 'string' ? '123' + res : res;
      },
      name: 'tests run in browser',
      tags: []
    })
    .then(function (res) {
      assert(res === '123abcdefg');
    })
  });
});