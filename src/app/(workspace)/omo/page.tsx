"use client";

import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  const { data } = useSession();
  console.log(data, "session data");
  return (
    <div>
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
};

export default Dashboard;
