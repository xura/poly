[@bs.val] external alert: string => unit = "alert";
[@bs.module "../../../../src/renderer/lib"]
external lib: string => unit = "default";

open MscharleyBsMaterialUiIcons;
open MaterialUi;

[@react.component]
let make = () =>
  <MaterialUi.List style={ReactDOMRe.Style.make(~backgroundColor="#fff", ())}>
    <ListItem button=true onClick={_event => lib("")}>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {"Data" |> React.string} </ListItemText>
    </ListItem>
    <ListItem button=true>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {"Saturn" |> React.string} </ListItemText>
    </ListItem>
    <ListItem button=true>
      <ListItemIcon> <Code.Filled /> </ListItemIcon>
      <ListItemText> {"Emporium" |> React.string} </ListItemText>
    </ListItem>
  </MaterialUi.List>;