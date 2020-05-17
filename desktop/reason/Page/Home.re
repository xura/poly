[@bs.val] external alert: string => unit = "alert";
[@bs.module "../../../../src/renderer/lib"]
external lib: string => unit = "default";

open MscharleyBsMaterialUiIcons;
open MaterialUi;

let count = Rx.interval(~period=500, ());

[@react.component]
let make = () => {
  let (number, setNumber) = React.useState(() => 0);

  React.useLayoutEffect0(() => {
    count
    |> Rx.Observable.subscribe(
         ~next=x => setNumber(_ => x),
         ~error=ignore,
         ~complete=ignore,
       );
    None;
  });

  <MaterialUi.List style={ReactDOMRe.Style.make(~backgroundColor="#fff", ())}>
    <ListItem button=true onClick={_event => lib("")}>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {"Data" |> React.string} </ListItemText>
    </ListItem>
    <ListItem button=true>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {string_of_int(number) |> React.string} </ListItemText>
    </ListItem>
    <ListItem button=true>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {"Emporium" |> React.string} </ListItemText>
    </ListItem>
  </MaterialUi.List>;
};