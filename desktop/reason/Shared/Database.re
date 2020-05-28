// type purifyMaybe = {
//   orDefault: (. int) => int,
//   isNothing: (. unit) => bool,
// };

[@bs.module "../../../../src/renderer/shared/database"]
external insertHero: unit => unit = "insertHero";

let getDatabase = () => {
  insertHero(); // let db = external_getDatabase(1);
            // db.isNothing(.) ? None : Some(db.orDefault(. 5));
};