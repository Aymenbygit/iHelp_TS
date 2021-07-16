import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }:any) => {
  const AuthReducer = useSelector((state:any) => state.AuthReducer);
  return (
    <Route
      {...rest}
      render={(props:any) =>
        !AuthReducer.isAuth ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoutes;
