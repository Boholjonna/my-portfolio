import React, { useRef, useState, useEffect } from "react";
import "../styles/SparkBallButton.css";

const defaultPosition = { bottom: "2rem", right: "2rem" };

const EYE_CX_LEFT = 10;
const EYE_CX_RIGHT = 22;
const EYE_CY = 14;
const EYE_RX = 4.5; // much bigger eyes
const EYE_RY = 6;
const PUPIL_RX = 2.2; // much bigger pupils
const PUPIL_RY = 3.2;
const PUPIL_MOVE_RADIUS = 1.5; // how far the pupil can move from center

const FACE_CENTER = { x: 16, y: 16 };

function getInitialPxPosition(position) {
  // Convert CSS position object to px values for left/top
  if (position.left !== undefined && position.top !== undefined) {
    return { x: parseInt(position.left), y: parseInt(position.top) };
  }
  // Default to bottom right
  return null;
}

const SparkBallButton = ({
  position = defaultPosition,
  onClick = () => {},
  style = {},
}) => {
  const buttonRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState(null); // {x, y} in px
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // Mouse tracking for eye movement
  useEffect(() => {
    function handleMouseMove(e) {
      // Get face center in viewport
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const faceCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      // Mouse position
      const mouseX = e.touches ? e.touches[0].clientX : e.clientX;
      const mouseY = e.touches ? e.touches[0].clientY : e.clientY;
      // Vector from face center to mouse
      const dx = mouseX - faceCenter.x;
      const dy = mouseY - faceCenter.y;
      // Normalize and clamp
      const dist = Math.sqrt(dx * dx + dy * dy);
      let nx = 0, ny = 0;
      if (dist > 0) {
        nx = dx / dist;
        ny = dy / dist;
      }
      setPupilOffset({ x: nx * PUPIL_MOVE_RADIUS, y: ny * PUPIL_MOVE_RADIUS });
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  // Calculate initial position in px if user drags
  const handleDragStart = (e) => {
    e.preventDefault();
    setDragging(true);
    const rect = buttonRef.current.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setDragPos({ x: rect.left, y: rect.top });
    document.body.style.userSelect = "none";
  };

  const clampToViewport = (x, y) => {
    if (!buttonRef.current) return { x, y };
    const btnRect = buttonRef.current.getBoundingClientRect();
    const width = btnRect.width || 64;
    const height = btnRect.height || 64;
    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;
    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    };
  };

  const handleDrag = (e) => {
    if (!dragging) return;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    let x = clientX - dragOffset.x;
    let y = clientY - dragOffset.y;
    // Clamp to viewport
    const clamped = clampToViewport(x, y);
    setDragPos(clamped);
  };

  const handleDragEnd = () => {
    setDragging(false);
    document.body.style.userSelect = "";
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDrag, { passive: false });
      window.addEventListener("touchend", handleDragEnd);
    } else {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("touchend", handleDragEnd);
    };
    // eslint-disable-next-line
  }, [dragging]);

  // On window resize, keep the ball in view
  useEffect(() => {
    function handleResize() {
      if (dragPos) {
        setDragPos((pos) => {
          if (!pos) return pos;
          return clampToViewport(pos.x, pos.y);
        });
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [dragPos]);

  // Style: if being dragged, use px; else use default position
  let ballStyle = {
    position: "fixed",
    zIndex: 9999,
    cursor: dragging ? "grabbing" : "grab",
    ...style,
  };
  if (dragPos) {
    ballStyle.left = dragPos.x + "px";
    ballStyle.top = dragPos.y + "px";
    ballStyle.right = "auto";
    ballStyle.bottom = "auto";
  } else {
    Object.assign(ballStyle, position);
  }

  return (
    <button
      className="spark-ball-btn"
      style={ballStyle}
      onClick={onClick}
      aria-label="Spark Ball Button"
      ref={buttonRef}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      tabIndex={0}
    >
      <span className={`spark-ball${dragging ? ' dragging' : ''}`}>
        {/* Cute happy face inside the ball */}
        <span className="spark-face">
          <svg width="32" height="32" viewBox="0 0 32 32" className="face-svg">
            {/* Eyes */}
            <ellipse className="eye left-eye" cx={EYE_CX_LEFT} cy={EYE_CY} rx={EYE_RX} ry={EYE_RY} fill="#fff"/>
            <ellipse className="eye right-eye" cx={EYE_CX_RIGHT} cy={EYE_CY} rx={EYE_RX} ry={EYE_RY} fill="#fff"/>
            {/* Pupils */}
            <ellipse className="pupil left-pupil" cx={EYE_CX_LEFT + pupilOffset.x} cy={EYE_CY + 1 + pupilOffset.y} rx={PUPIL_RX} ry={PUPIL_RY} fill="#000"/>
            <ellipse className="pupil right-pupil" cx={EYE_CX_RIGHT + pupilOffset.x} cy={EYE_CY + 1 + pupilOffset.y} rx={PUPIL_RX} ry={PUPIL_RY} fill="#000"/>
            {/* Smile */}
            <path className="smile" d="M12 20 Q16 25 20 20" stroke="#fff" strokeWidth="2" fill="none"/>
          </svg>
        </span>
      </span>
    </button>
  );
};

export default SparkBallButton; 