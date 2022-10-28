import { useRef } from "react";

const useDisabledElement = () => {
  const element = useRef<HTMLSelectElement>(null);

  const disableElement = (state: boolean) => {
    element!.current!.disabled = state;
  };

  return { element, disableElement };
};

export default useDisabledElement;
