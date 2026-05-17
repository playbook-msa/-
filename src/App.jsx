import { useState, useRef, useEffect } from "react";
import ToolPlaybooks from "./ToolPlaybooks";

const BASE = import.meta.env.BASE_URL;

function App() {
  const [phase, setPhase] = useState("ready"); // "ready" | "video" | "flipping" | "done"
  const videoRef = useRef(null);

  useEffect(() => {
    if (phase === "video") {
      const timer = setTimeout(() => {
        if (phase === "video") setPhase("flipping");
      }, 21000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "flipping") {
      const t = setTimeout(() => setPhase("done"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleVideoEnd = () => {
    if (phase === "video") setPhase("flipping");
  };

  const startVideo = () => {
    setPhase("video");
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  if (phase === "done") {
    return <ToolPlaybooks />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

        .flip-container {
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          perspective: 2000px;
          overflow: hidden;
          background: #050508;
        }

        .flip-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        .flip-card.flipping {
          transform: rotateY(-180deg);
        }

        .flip-face {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-front {
          z-index: 2;
          background: #050508;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flip-back {
          transform: rotateY(180deg);
          overflow-y: auto;
          overflow-x: hidden;
          background: #050508;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050508;
        }

        .intro-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #050508;
        }

        /* Neon frame */
        .neon-frame {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 2;
        }
        .neon-frame::before {
          content: '';
          position: absolute;
          top: 6px; left: 6px; right: 6px; bottom: 6px;
          border: 2px solid rgba(0, 229, 255, 0.25);
          border-radius: 4px;
          box-shadow: inset 0 0 12px rgba(0, 229, 255, 0.06), 0 0 12px rgba(0, 229, 255, 0.06);
        }
        @media (max-width: 600px) {
          .neon-frame::before {
            top: 3px; left: 3px; right: 3px; bottom: 3px;
            border-width: 1px;
          }
        }

        /* Progress bar */
        .progress-track {
          position: absolute;
          bottom: 0; left: 0; width: 100%; height: 3px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 3;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #FF2D8A, #00E5FF);
          box-shadow: 0 0 10px rgba(255, 45, 138, 0.5);
          animation: progressFill 19s linear forwards;
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        /* Glow flash */
        .glow-flash {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none; z-index: 4; opacity: 0;
        }
        .flipping .flip-front .glow-flash {
          animation: flashGlow 0.6s ease-out forwards;
        }
        @keyframes flashGlow {
          0% { opacity: 0; }
          30% { opacity: 1; background: radial-gradient(ellipse at center, rgba(0, 229, 255, 0.15), transparent 70%); }
          100% { opacity: 0; }
        }

        /* === READY SCREEN === */
        .ready-screen {
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          background: #050508;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .ready-glow-pink {
          position: absolute;
          width: 400px; height: 400px;
          top: 20%; left: 10%;
          background: radial-gradient(ellipse, rgba(255, 45, 138, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .ready-glow-cyan {
          position: absolute;
          width: 350px; height: 350px;
          bottom: 15%; right: 10%;
          background: radial-gradient(ellipse, rgba(0, 229, 255, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .ready-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 24px;
        }

        .ready-label {
          font-family: 'Orbitron', monospace;
          font-size: 11px;
          letter-spacing: 4px;
          color: #00E5FF;
          text-transform: uppercase;
          margin-bottom: 16px;
          text-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
        }
        @media (max-width: 600px) {
          .ready-label { font-size: 9px; letter-spacing: 2px; }
        }

        .ready-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 42px;
          font-weight: 900;
          color: #FF2D8A;
          text-shadow: 0 0 40px rgba(255, 45, 138, 0.5), 0 0 80px rgba(255, 45, 138, 0.2);
          letter-spacing: 3px;
          margin-bottom: 12px;
        }
        @media (max-width: 600px) {
          .ready-title { font-size: 28px; letter-spacing: 1px; }
        }

        .ready-sub {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          color: #8888AA;
          font-weight: 500;
          letter-spacing: 1px;
          margin-bottom: 48px;
        }
        @media (max-width: 600px) {
          .ready-sub { font-size: 14px; margin-bottom: 36px; }
        }

        .play-button {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 2px solid rgba(0, 229, 255, 0.5);
          background: rgba(0, 229, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          animation: pulseGlow 2s ease-in-out infinite;
          margin-bottom: 20px;
        }
        .play-button:hover {
          border-color: #00E5FF;
          background: rgba(0, 229, 255, 0.15);
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.3);
          transform: scale(1.05);
        }
        @media (max-width: 600px) {
          .play-button { width: 72px; height: 72px; }
        }

        .play-triangle {
          width: 0; height: 0;
          border-style: solid;
          border-width: 16px 0 16px 28px;
          border-color: transparent transparent transparent #00E5FF;
          margin-left: 4px;
          filter: drop-shadow(0 0 6px rgba(0, 229, 255, 0.6));
        }
        @media (max-width: 600px) {
          .play-triangle { border-width: 12px 0 12px 22px; margin-left: 3px; }
        }

        .play-hint {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          color: #555570;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          animation: pulseOpacity 2s ease-in-out infinite;
        }

        .skip-button {
          margin-top: 32px;
          padding: 10px 28px;
          border-radius: 8px;
          border: 1px solid rgba(255, 45, 138, 0.3);
          background: rgba(255, 45, 138, 0.08);
          color: #FF2D8A;
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
        }
        .skip-button:hover {
          background: rgba(255, 45, 138, 0.15);
          border-color: rgba(255, 45, 138, 0.5);
          box-shadow: 0 0 20px rgba(255, 45, 138, 0.2);
        }
        @media (max-width: 600px) {
          .skip-button { padding: 9px 22px; font-size: 11px; margin-top: 24px; }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 229, 255, 0.15); }
          50% { box-shadow: 0 0 25px rgba(0, 229, 255, 0.25); }
        }
        @keyframes pulseOpacity {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .ready-line-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 45, 138, 0.4), rgba(0, 229, 255, 0.4), transparent);
        }
        .ready-line-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.4), rgba(255, 45, 138, 0.4), transparent);
        }
      `}</style>

      {phase === "ready" && (
        <div className="ready-screen" onClick={startVideo}>
          <div className="ready-glow-pink" />
          <div className="ready-glow-cyan" />
          <div className="ready-line-top" />
          <div className="ready-line-bottom" />
          <div className="ready-content">
            <div className="ready-label">Mutiny · ALX · Programme</div>
            <div className="ready-title">TOOL PLAYBOOKS</div>
            <div className="ready-sub">Your guide to every platform · Built for creators</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="play-button">
                <div className="play-triangle" />
              </div>
              <div className="play-hint">Tap to begin</div>
            </div>
            <button
              className="skip-button"
              onClick={(e) => { e.stopPropagation(); setPhase("done"); }}
            >
              Skip to Tools →
            </button>
          </div>
        </div>
      )}

      {(phase === "video" || phase === "flipping") && (
        <div className="flip-container">
          <div className={`flip-card ${phase === "flipping" ? "flipping" : ""}`}>
            <div className="flip-face flip-front">
              <div className="video-wrapper">
                <video
                  ref={videoRef}
                  className="intro-video"
                  src={`${BASE}intro.mp4`}
                  playsInline
                  onEnded={handleVideoEnd}
                />
                <div className="neon-frame" />
                <div className="progress-track">
                  <div className="progress-bar" />
                </div>
                <div className="glow-flash" />
              </div>
            </div>
            <div className="flip-face flip-back">
              <ToolPlaybooks />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
