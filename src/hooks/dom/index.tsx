import { MutableRefObject, useEffect } from "react";

import { useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

interface OutsideClickProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: MutableRefObject<any>;
  onClickInside?: (event: MouseEvent) => void;
  onClickOutside?: (event: MouseEvent) => void;
}

export default function useWindowSize(): WindowSize {
  const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}

export function useComponentClick({
  ref,
  onClickInside,
  onClickOutside,
}: OutsideClickProps) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target))
        onClickOutside && onClickOutside(event);
      else onClickInside && onClickInside(event);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClickInside, onClickOutside, ref]);
}
