import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-navigation">
      {!currentUser && (
        <>
          <Link to={`/Kanbas/Account/Signin`}>Signin</Link>
          <br />
          <Link to={`/Kanbas/Account/Signup`}>Signup</Link>
          <br />
        </>
      )}
      {currentUser && (
        <>
          <Link to={`/Kanbas/Account/Profile`}>Profile</Link>
          <br />
          {currentUser.role === "ADMIN" && (
            <>
              <Link to={`/Kanbas/Account/Users`}>Users</Link>
              <br />
            </>
          )}
        </>
      )}
    </div>
  );
}
