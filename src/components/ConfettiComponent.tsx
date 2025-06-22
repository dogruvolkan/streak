import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

interface ConfettiComponentProps {
  active: boolean;
  onComplete?: () => void;
}

const ConfettiComponent: React.FC<ConfettiComponentProps> = ({
  active,
  onComplete,
}) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (active) {
      setIsActive(true);

      // Add haptic feedback if available
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
      }

      // Stop confetti after 3 seconds
      const timer = setTimeout(() => {
        setIsActive(false);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!isActive) return null;

  return (
    <Confetti
      width={windowDimensions.width}
      height={windowDimensions.height}
      numberOfPieces={200}
      recycle={false}
      gravity={0.3}
      colors={[
        "#FFD700", // Gold
        "#FF6B6B", // Red
        "#4ECDC4", // Teal
        "#45B7D1", // Blue
        "#96CEB4", // Green
        "#FECA57", // Yellow
        "#FF9FF3", // Pink
        "#54A0FF", // Blue
        "#5F27CD", // Purple
        "#00C9FF", // Cyan
      ]}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
};

export default ConfettiComponent;
