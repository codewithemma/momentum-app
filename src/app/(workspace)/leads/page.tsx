import LeadsClientPage from "./components/leads-client-page";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <LeadsClientPage />
    </Suspense>
  );
};

export default page;
