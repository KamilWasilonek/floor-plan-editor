import { observer } from "mobx-react";
import React, { memo } from "react";
import GoogleLogin from "react-google-login";

import { useInstance } from "react-ioc";
import { UserService } from "../services/user.service";
import Window from "./window";

const LoginDialog = ({active, onClickOutside}: {
  active: boolean;
  onClickOutside?: (e: React.MouseEvent) => void;
}) => {
  const userService = useInstance(UserService);

  return <>
    <Window
      active={active}
      onClickOutside={onClickOutside}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_KEY}
        buttonText="Sign in with Google"
        onSuccess={userService.onAuthCallback}
        onFailure={userService.onAuthCallback}
        cookiePolicy={"single_host_origin"}
      />
    </Window>
  </>;
};

export default memo(observer(LoginDialog));
