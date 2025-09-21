import React from "react";

const Loading = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "6px solid #ccc",
    borderTopColor: "#1d4ed8", // Tailwind blue-700 equivalent
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Add keyframes for spin animation globally in index.css
export default Loading;
