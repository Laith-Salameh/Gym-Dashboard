import React, {useState, useEffect} from "react"

const useMobile = (myRef: React.RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const mobileSize = 600;

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef?.current?.offsetWidth ?? 0,
      height: myRef?.current?.offsetHeight?? 0
    })
    
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])
  return dimensions.width <= mobileSize ;
};

export default useMobile;