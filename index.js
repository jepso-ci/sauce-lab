var debug = require('debug')('sauce-lab:base');
var wd = require('wd');
var Q = require('q');

module.exports = run;
function run(config) {
  var user = config.user;
  var key = config.key;

  var url = config.url;

  var browser = config.browser;
  browser.name = config.name;
  browser.tags = config.tags;

  var code = config.code;
  var parse = config.parse;

  var remote = wd.remote('ondemand.saucelabs.com', 80, user, key);
  var init = Q.nfbind(remote.init.bind(remote));
  var get = Q.nfbind(remote.get.bind(remote));
  var exec = Q.nfbind(remote.eval.bind(remote));
  var quit = remote.quit.bind(remote);
  function poll() {
    return exec(code)
      .then(function (result) {
        return parse(result);
      })
      .then(function (parsed) {
        return parsed === null ? poll() : parsed;
      });
  }

  return init(browser)
    .then(function () {
      return get(url);
    })
    .then(function () {
      return poll();
    })
    .then(function (v) {
      quit();
      return v;
    }, function (e) {
      quit();
      throw e;
    });
}