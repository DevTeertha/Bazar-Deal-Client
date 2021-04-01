import React, { useContext } from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
import { MyContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
  const { userState } = useContext(MyContext);
  const [user] = userState;
    const { email } = user;
    return (
      <Route
        {...rest}
        render={({ location }) =>
        email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;