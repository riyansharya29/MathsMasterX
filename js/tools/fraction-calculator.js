/* Tool: Fraction Calculator (public id "fraction-calculator")
   Reuses the fully-tested fractions implementation (add / subtract / multiply /
   divide / simplify, exact local arithmetic — no AI). This module mirrors the
   canonical "fractions" tool under the requested module id, keeping a single
   source of logic (no duplicated calculation code). */
(function () {
  "use strict";
  MMX.toolkit.load("fractions").then(function (impl) {
    MMX.toolkit.register({
      id: "fraction-calculator",
      render: function (mount) { impl.render(mount); }
    });
  });
})();
