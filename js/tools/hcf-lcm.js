/* Tool: HCF & LCM Calculator (public id "hcf-lcm")
   Reuses the fully-tested lcm-hcf implementation (two or more positive integers,
   prime factorisation + Euclid's division algorithm, all local). Mirrors the
   canonical "lcm-hcf" tool under the requested module id — single logic source. */
(function () {
  "use strict";
  MMX.toolkit.load("lcm-hcf").then(function (impl) {
    MMX.toolkit.register({
      id: "hcf-lcm",
      render: function (mount) { impl.render(mount); }
    });
  });
})();
