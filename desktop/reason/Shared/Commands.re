type twebpackWatch = {
  changes: Rx_Observable.Observable.t((string, string)),
  start: unit => unit,
  stop: unit => unit,
};

[@bs.module "../../../../src/renderer/commands"]
external webpackWatch: twebpackWatch = "webpackWatch";