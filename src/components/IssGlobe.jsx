"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const IssGlobe = ({ lat = 0, lng = 0, size = 400 }) => {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);
  const targetPhiRef = useRef(0);
  const targetThetaRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    let width = size;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.18, 0.18, 0.32],
      markerColor: [0.51, 0.76, 0.8],
      glowColor: [0.36, 0.21, 0.8],
      markers: [{ location: [lat, lng], size: 0.08 }],
      onRender: (state) => {
        // Smoothly interpolate towards the target rotation
        phiRef.current += (targetPhiRef.current - phiRef.current) * 0.04;
        state.phi = phiRef.current;
        state.theta = targetThetaRef.current;
        state.markers = [{ location: [lat, lng], size: 0.08 }];
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [size]);

  // Spin the globe so that the ISS marker stays roughly visible
  useEffect(() => {
    targetPhiRef.current = -((lng + 180) * Math.PI) / 180;
    targetThetaRef.current = (lat * Math.PI) / 360;
  }, [lat, lng]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        maxWidth: size,
        contain: "layout paint size",
      }}
      aria-label="Globe showing ISS position"
    />
  );
};

export default IssGlobe;
