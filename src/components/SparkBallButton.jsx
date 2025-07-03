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

const DRAG_THRESHOLD = 5; // px

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
  style = {},
}) => {
  const buttonRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState(null); // {x, y} in px
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [overlay, setOverlay] = useState(false);
  const [preOverlayPos, setPreOverlayPos] = useState(null);
  const [dragStartPos, setDragStartPos] = useState(null);
  const [dragMoved, setDragMoved] = useState(false);

  // Mouse tracking for eye movement
  useEffect(() => {
    function handleMouseMove(e) {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const faceCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const mouseX = e.touches ? e.touches[0].clientX : e.clientX;
      const mouseY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = mouseX - faceCenter.x;
      const dy = mouseY - faceCenter.y;
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

  // Clamp to viewport
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

  // Drag logic
  const handleDragStart = (e) => {
    if (overlay) return; // Prevent drag when overlay is active
    e.preventDefault();
    setDragging(true);
    setDragMoved(false);
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    setDragStartPos({ x: clientX, y: clientY });
    const rect = buttonRef.current.getBoundingClientRect();
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setDragPos({ x: rect.left, y: rect.top });
    document.body.style.userSelect = "none";
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
    // Detect if moved enough to be a drag
    if (dragStartPos && !dragMoved) {
      const dx = clientX - dragStartPos.x;
      const dy = clientY - dragStartPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
        setDragMoved(true);
      }
    }
    let x = clientX - dragOffset.x;
    let y = clientY - dragOffset.y;
    const clamped = clampToViewport(x, y);
    setDragPos(clamped);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleDrag, { passive: false });
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
      if (dragPos && !overlay) {
        setDragPos((pos) => {
          if (!pos) return pos;
          return clampToViewport(pos.x, pos.y);
        });
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [dragPos, overlay]);

  // Overlay logic
  const handleBallClick = (e) => {
    // Only trigger overlay if not a drag
    if (dragMoved) return;
    if (!overlay) {
      // Activate overlay: save current position, move to center
      let prev = dragPos;
      if (!prev && buttonRef.current) {
        // If never dragged, calculate from default
        const rect = buttonRef.current.getBoundingClientRect();
        prev = { x: rect.left, y: rect.top };
      }
      setPreOverlayPos(prev);
      setOverlay(true);
    } else {
      // Deactivate overlay: restore previous position
      setOverlay(false);
      setTimeout(() => {
        if (preOverlayPos) setDragPos(preOverlayPos);
      }, 300); // Wait for transition
    }
  };

  // Overlay: close on scroll (for mobile UX)
  useEffect(() => {
    if (!overlay) return;
    const handleScroll = () => setOverlay(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [overlay]);

  // Ball style
  let ballStyle = {
    position: "fixed",
    zIndex: 9999,
    cursor: overlay ? "pointer" : dragging ? "grabbing" : "grab",
    ...style,
  };
  if (overlay) {
    // Center the ball with transition
    const size = buttonRef.current ? buttonRef.current.offsetWidth : 64;
    ballStyle.left = `calc(50vw - ${size / 2}px)`;
    ballStyle.top = `calc(50vh - ${size / 2}px)`;
    ballStyle.right = "auto";
    ballStyle.bottom = "auto";
    ballStyle.transition = "left 0.4s cubic-bezier(.4,1.6,.4,1), top 0.4s cubic-bezier(.4,1.6,.4,1)";
  } else if (dragPos) {
    ballStyle.left = dragPos.x + "px";
    ballStyle.top = dragPos.y + "px";
    ballStyle.right = "auto";
    ballStyle.bottom = "auto";
    // No transition during drag
    ballStyle.transition = dragging ? "none" : undefined;
  } else {
    Object.assign(ballStyle, position);
    ballStyle.transition = undefined;
  }

  return (
    <>
      {overlay && (
        <>
          <div className="spark-ball-overlay" onClick={() => setOverlay(false)} />
          <div className="spark-ball-options">
            {[
              { label: "About", angle: -90, id: "about" },
              { label: "Projects", angle: -18, id: "projects" },
              { label: "Experience", angle: 45, id: "experience" },
              { label: "Credentials", angle: 135, id: "credentials" },
              { label: "Contact", angle: 198, id: "contact" },
            ].map((opt, i) => {
              // Position options in a circle
              const radius = 110; // reduced px from center to move closer
              const rad = (opt.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              const handleOptionClick = () => {
                const section = document.getElementById(opt.id);
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
                setOverlay(false);
              };
              return (
                <div
                  key={opt.label}
                  className="spark-option"
                  style={{
                    left: `calc(50% + ${x}px)` ,
                    top: `calc(50% + ${y}px)` ,
                  }}
                >
                  <span className="spark-option-label" onClick={handleOptionClick}>{opt.label}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
      <button
        className={`spark-ball-btn`}
        style={ballStyle}
        aria-label="Spark Ball Button"
        ref={buttonRef}
        onMouseDown={overlay ? undefined : handleDragStart}
        onTouchStart={overlay ? undefined : handleDragStart}
        onClick={handleBallClick}
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
    </>
  );
};

export default SparkBallButton; 