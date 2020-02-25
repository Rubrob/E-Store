import {
  useState,
  // useEffect,
  useCallback
} from "react";

// export const usePageYOffset = (YOffset) => {
//   const [offset, setOffset] = useState(false)
//   const onScroll = useCallback() => {
//     setOffset(window.pageYOffset > YOffset)
//   }

//   useEffect(() => {
//     window.addEventListener("scroll", onScroll)
//     return () => window.removeEventListener("scroll", onScroll)
//   }, [offset, onScroll]) //add onScroll

//   return offset
// }

export const useRefCallback = (
  defaults = {
    top: 0,
    bottom: 0
  }
) => {
  const [offsets, setOffsets] = useState(defaults);

  const setRef = useCallback(
    node => {
      if (!!node) {
        const onScroll = () => {
          const bounding = node.getBoundingClientRect();
          // console.log(bounding.bottom - defaults.bottom, window.scrollY);
          setOffsets({
            top: bounding.top - defaults.top,
            bottom: bounding.bottom - defaults.bottom
          });
        };

        window.addEventListener("scroll", () => setTimeout(onScroll, 0));
      }
    },
    [defaults.top, defaults.bottom]
  );

  return [setRef, offsets];
};
