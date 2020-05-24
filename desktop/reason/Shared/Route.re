type route =
  | Home
  | Collections;

let useRoute: unit => route =
  () => {
    let _url = ReasonReactRouter.useUrl();
    let urlParts =
      [%bs.raw {| window.location.href |}] |> Js.String.split("/");

    switch (urlParts) {
    | [|_, _, _, "collections"|] => Collections
    | _ => Home
    };
  };