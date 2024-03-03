import React, { useEffect } from "react";

const StepByStep = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: "65de260f1ef2d2749c5cd239" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default StepByStep;
