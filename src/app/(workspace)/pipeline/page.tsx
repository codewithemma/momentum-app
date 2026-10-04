import PipelineClientPage from "./components/pipeline-client-page";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <PipelineClientPage />
    </Suspense>
  );
};

export default page;
