// src/components/ScrollSection.js
import React from "react";

const ScrollSection = ({ text1, text2 }) => {
  return (
    <section className="scroll-section">
      <h3>{text1}</h3>
      {text2 && <h3>{text2}</h3>}
    </section>
  );
};

export default ScrollSection;
