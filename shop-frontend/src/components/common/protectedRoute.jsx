import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import NavBar from "../navBar";

const ProtectedRoute = function ({
  path,
  component: Component,
  render,
  ...rest
}) {
  return (
    <>
      <NavBar />
      <Route
        {...rest}
        render={async (props) => {
          const response = await getCurrentUser();
          if (response && response.data)
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            );
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    </>
  );
};

export default ProtectedRoute;
