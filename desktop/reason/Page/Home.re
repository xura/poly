[@bs.val] external alert: string => unit = "alert";

open MscharleyBsMaterialUiIcons;
open MaterialUi;
open Commands;
open Database;

let count = Rx.interval(~period=500, ());
let {changes, start, stop} = webpackWatch;

[@react.component]
let make = () => {
  let (message, setMessage) = React.useState(() => "");
  Js.log("Maybe test:");
  let value = maybeTest(0);

  React.useLayoutEffect0(() => {
    changes
    |> Rx.Observable.subscribe(
         ~next=
           x => {
             let (_project, message) = x;
             setMessage(_ => message);
           },
         ~error=ignore,
         ~complete=ignore,
       )
    |> ignore;
    None;
  });

  <MaterialUi.List style={ReactDOMRe.Style.make(~backgroundColor="#fff", ())}>
    <ListItem button=true onClick={_event => start()}>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {"Data" |> React.string} </ListItemText>
    </ListItem>
    <ListItem button=true onClick={_event => stop()}>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {message |> React.string} </ListItemText>
    </ListItem>
    <ListItem button=true>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {string_of_int(value) |> React.string} </ListItemText>
    </ListItem>
  </MaterialUi.List>;
};