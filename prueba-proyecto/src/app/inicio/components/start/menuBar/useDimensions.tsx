import React, { useEffect, useRef } from 'react'

export const useDimensions = (ref: any) => {

  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref && ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
}
