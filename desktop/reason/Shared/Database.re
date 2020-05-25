type purifyMaybe = {
  orDefault: (. int) => int,
  isNothing: (. unit) => bool,
};

[@bs.module "../../../../src/renderer/shared/database"]
external maybeTest: int => purifyMaybe = "maybeTest";

let getDatabase = () => {
  let db = maybeTest(1);
  db.isNothing(.) ? None : Some(db.orDefault(. 5));
};