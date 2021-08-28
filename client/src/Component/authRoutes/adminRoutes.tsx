import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loadUser } from "../../redux/action/authAction";

const AdminRoutes = ({ component: Component, ...rest }: any) => {
  const AuthReducer = useSelector((state: any) => state.AuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        AuthReducer.isAuth &&
        AuthReducer.user &&
        AuthReducer.user.type === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoutes;
