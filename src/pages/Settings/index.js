import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import StyledTextField from "components/StyledTextField";

import "./styles.scss";

export const defaultStyles = {
  fontSize: `100%`,
  background: "#FFFFFF",
  color: "#000000",
  paddingTop: `20px`,
  paddingBottom: `20px`,
  paddingLeft: `20px`,
  paddingRight: `20px`,
  arrowColor: "#000000"
};

const Settings = () => {
  const [styles, setStyles] = useState(defaultStyles);

  useEffect(() => {
    getSavedStyles()
  }, []);

  const getSavedStyles = () => {
    const savedStyles = localStorage.getItem("bookStyles");
    if (!!savedStyles) {
      setStyles(JSON.parse(savedStyles));
    }
  };

  const saveStyles = () => localStorage.setItem("bookStyles", JSON.stringify(styles));

  return (
    <div className="settings-wrapper">
      <div className="section">
        <div className="section-title">Basic</div>
        <div className="input-box">
          <div className="label">Font Size</div>
          <StyledTextField value={styles.fontSize} onChange={e => setStyles({ ...styles, fontSize: e.target.value })} />
        </div>
        <div className="input-box">
          <div className="label">Font color</div>
          <label className="color-value" htmlFor="fontColor" style={{ background: styles.color }} />
          <input className="color-input" id="fontColor" type="color" value={styles.color} onChange={e => setStyles({ ...styles, color: e.target.value })} />
        </div>
        <div className="input-box">
          <div className="label">Background color</div>
          <label className="color-value" htmlFor="backgroundColor" style={{ background: styles.background }} />
          <input className="color-input" id="backgroundColor" type="color" value={styles.background} onChange={e => setStyles({ ...styles, background: e.target.value })} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Padding</div>
        <div className="input-box">
          <div className="label">Padding Top</div>
          <StyledTextField value={styles.paddingTop} onChange={e => setStyles({ ...styles, paddingTop: e.target.value })} />
        </div>
        <div className="input-box">
          <div className="label">Padding Bottom</div>
          <StyledTextField value={styles.paddingBottom} onChange={e => setStyles({ ...styles, paddingBottom: e.target.value })} />
        </div>
        <div className="input-box">
          <div className="label">Padding Left</div>
          <StyledTextField value={styles.paddingLeft} onChange={e => setStyles({ ...styles, paddingLeft: e.target.value })} />
        </div>
        <div className="input-box">
          <div className="label">Padding Right</div>
          <StyledTextField value={styles.paddingRight} onChange={e => setStyles({ ...styles, paddingRight: e.target.value })} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Misc</div>
        <div className="input-box">
          <div className="label">Arrow color</div>
          <label className="color-value" htmlFor="arrowColor" style={{ background: styles.arrowColor }} />
          <input className="color-input" id="arrowColor" type="color" value={styles.arrowColor} onChange={e => setStyles({ ...styles, arrowColor: e.target.value })} />
        </div>
      </div>
      <div className="controls-wrapper">
        <Button className="reset" onClick={() => setStyles(defaultStyles)}>Reset to default</Button>
        <Button className="save" onClick={saveStyles}>Save changes</Button>
      </div>
    </div>
  )
};

export default Settings;
