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

let goTo = location => {
  location |> ReasonReactRouter.push;
  ignore();
};

let drawerWidth = 240;

let style = ReactDOMRe.Style.make;
[%mui.withStyles
  "RootStyles"(theme =>
    {
      activePage: style(~borderRight="5px solid #623CEA", ()),
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

module Navigation = {
  [@react.component]
  let make = () => {
    let classes = RootStyles.useStyles();
    let _url = ReasonReactRouter.useUrl();
    let isActive = menuItem => {
      let location =
        switch ([%bs.raw {| window.location.href |}] |> Js.String.split("/")) {
        | [|_, _, _, location|] => location
        | _ => "home"
        };
      menuItem == location;
    };

    <MaterialUi.List>
      <ListItem
        button=true
        className={isActive("home") ? classes.activePage : ""}
        onClick={_event => goTo("/home")}>
        <ListItemIcon>
          <MscharleyBsMaterialUiIcons.Home.Filled />
        </ListItemIcon>
        <ListItemText> {"Home" |> React.string} </ListItemText>
      </ListItem>
      <ListItem
        button=true
        className={isActive("collections") ? classes.activePage : ""}
        onClick={_event => goTo("/collections")}>
        <ListItemIcon>
          <MscharleyBsMaterialUiIcons.ViewModule.Filled />
        </ListItemIcon>
        <ListItemText> {"Collections" |> React.string} </ListItemText>
      </ListItem>
    </MaterialUi.List>;
  };
};

module Root = {
  [@react.component]
  let make = () => {
    let classes = RootStyles.useStyles();
    let route = Route.useRoute();

    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        classes=[Paper(classes.drawerPaper)]
        variant=`Permanent>
        <Navigation />
      </Drawer>
      <main className={classes.content}>
        {switch (route) {
         | Collections => <Collections />
         | Home => <Home />
         }}
      </main>
    </div>;
  };
};

[@react.component]
let make = () => <MuiThemeProvider theme> <Root /> </MuiThemeProvider>;