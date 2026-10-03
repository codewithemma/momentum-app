"use client";

import { signOut } from "next-auth/react";

const Dashboard = () => {
  return (
    <div>
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
};

export default Dashboard;
