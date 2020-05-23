open MaterialUi;

let theme =
  MaterialUi_Theme.create(
    MaterialUi_ThemeOptions.(
      make(
        ~palette=
          PaletteOptions.make(
            ~primary=Primary.make(~main="#8fe830", ()),
            (),
          ),
        (),
      )
    ),
  );

let drawer = () =>
  <MaterialUi.List>
    <ListItem button=true>
      <ListItemIcon> <MscharleyBsMaterialUiIcons.Home.Filled /> </ListItemIcon>
      <ListItemText> {"Home" |> React.string} </ListItemText>
    </ListItem>
    <ListItem button=true>
      <ListItemIcon>
        <MscharleyBsMaterialUiIcons.ViewModule.Filled />
      </ListItemIcon>
      <ListItemText> {"Collections" |> React.string} </ListItemText>
    </ListItem>
  </MaterialUi.List>;

let drawerWidth = 240;

let style = ReactDOMRe.Style.make;
[%mui.withStyles
  "RootStyles"(theme =>
    {
      drawerPaper:
        style(
          ~position="relative",
          ~whiteSpace="nowrap",
          ~width={j|$(drawerWidth)px|j},
          ~transition=
            ThemeHelpers.transitionCreate(
              ~theme,
              ~affectWidth=true,
              ~easing=
                theme
                ->Theme.Theme.transitionsGet
                ->Theme.Transitions.easingGet
                ->Theme.Easing.sharpGet,
              ~duration=
                theme
                ->Theme.Theme.transitionsGet
                ->Theme.Transitions.durationGet
                ->Theme.Duration.enteringScreenGet,
              (),
            ),
          (),
        ),
      content: style(~flexGrow="1", ()),
      root: style(~display="flex", ()),
      drawer: style(~width={j|$(drawerWidth)px|j}, ~flexShrink="0", ()),
    }
  )
];

module Root = {
  [@react.component]
  let make = () => {
    let classes = RootStyles.useStyles();
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        classes=[Paper(classes.drawerPaper)]
        variant=`Permanent>
        {drawer()}
      </Drawer>
      <main className={classes.content}> <Home /> </main>
    </div>;
  };
};

[@react.component]
let make = () => <MuiThemeProvider theme> <Root /> </MuiThemeProvider>;