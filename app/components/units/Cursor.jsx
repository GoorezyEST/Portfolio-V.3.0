import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.set(cursorRef.current, { x: clientX, y: clientY });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div ref={cursorRef} className="custom_cursor"></div>;
}

export default Cursor;
