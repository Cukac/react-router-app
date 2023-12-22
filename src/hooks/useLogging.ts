import { useEffect } from "react";

const useLogging = (message: string, componentName: string) => {
  useEffect(() => {
    console.log(`${message} ${componentName}`);
  }, [message, componentName]);
};

export default useLogging;
