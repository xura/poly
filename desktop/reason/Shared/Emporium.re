[@bs.module "../../../../src/renderer/Emporium"]
external alertDoesThisWork: string => unit = "alertDoesThisWork";

[@bs.module "../../../../src/renderer/Emporium"]
external exampleMessage: unit => Rx_Observable.Observable.t(string) =
  "exampleMessage";