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
  //let value = getDatabase();

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
    <ListItem button=true onClick={_event => getDatabase()}>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {"Stuff and things" |> React.string} </ListItemText>
    </ListItem>
  </MaterialUi.List>;
  //  }}
  //  | Some(number) => string_of_int(number) |> React.string
  //  | None => "None" |> React.string
  // {switch (value) {
};