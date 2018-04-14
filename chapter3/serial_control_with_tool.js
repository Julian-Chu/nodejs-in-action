var flow = require('nimble');

flow.series([
  function(done) {
    setTimeout(function() {
      console.log("execute first");
      done();
    }, 1000);
  },

  function(done) {
    setTimeout(function() {
      console.log("execute next");
      done();
    }, 500);
  },

  function(done) {
    setTimeout(function() {
      console.log("execute last");
      done();
    }, 100)
  }
])