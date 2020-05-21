type tpoly = {
  changes: Rx_Observable.Observable.t((string, string)),
  start: unit => unit,
  stop: unit => unit,
};

[@bs.module "../../../../src/renderer/poly"] external poly: tpoly = "poly";