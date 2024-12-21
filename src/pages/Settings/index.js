import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import StyledSelect from "components/StyledSelect";
import { defaultSettings, getSavedSettings, saveSettings } from "helpers/ui";

import "./styles.scss";

const fontFamilyOptions = [
  { label: "Calibri", value: "Calibri" },
  { label: "General Sans", value: "GeneralSans" },
]

const Settings = () => {
  const [settingsData, setSettingsData] = useState(defaultSettings);

  useEffect(() => {
    initSettings()
  }, []);

  const initSettings = () => {
    const savedSettings = getSavedSettings();
    setSettingsData(savedSettings);
  };

  const handleSaveSettings = () => {
    saveSettings(settingsData);
    toast.success("Settings were saved successfully!");
  };

  const getSizeOptions = (min = 11, max = 34) => {
    const res = [];
    for (let i = min; i < max; i++) {
      const val = `${i}px`;
      res.push({ label: val, value: val });
    }
    return res;
  }

  return (
    <div className="settings-wrapper">
      <div className="section">
        <div className="section-title">Basic</div>
        <div className="input-box">
          <div className="label">Font Size</div>
          <StyledSelect
            value={settingsData.fontSize}
            onChange={val => setSettingsData({ ...settingsData, fontSize: val })}
            options={getSizeOptions()}
          />
        </div>
        <div className="input-box">
          <div className="label">Font Family</div>
          <StyledSelect
            className="wide"
            value={settingsData.fontFamily}
            onChange={val => setSettingsData({ ...settingsData, fontFamily: val })}
            options={fontFamilyOptions}
          />
        </div>
        <div className="input-box">
          <div className="label">Font color</div>
          <label className="color-value" htmlFor="fontColor" style={{ background: settingsData.color }} />
          <input className="color-input" id="fontColor" type="color" value={settingsData.color} onChange={e => setSettingsData({ ...settingsData, color: e.target.value })} />
        </div>
        <div className="input-box">
          <div className="label">Background color</div>
          <label className="color-value" htmlFor="backgroundColor" style={{ background: settingsData.background }} />
          <input className="color-input" id="backgroundColor" type="color" value={settingsData.background} onChange={e => setSettingsData({ ...settingsData, background: e.target.value })} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Padding</div>
        <div className="input-box">
          <div className="label">Padding Top</div>
          <StyledSelect
            value={settingsData.paddingTop}
            onChange={val => setSettingsData({ ...settingsData, paddingTop: val })}
            options={getSizeOptions(0, 50)}
          />
        </div>
        <div className="input-box">
          <div className="label">Padding Bottom</div>
          <StyledSelect
            value={settingsData.paddingBottom}
            onChange={val => setSettingsData({ ...settingsData, paddingBottom: val })}
            options={getSizeOptions(0, 50)}
          />
        </div>
        <div className="input-box">
          <div className="label">Padding Left</div>
          <StyledSelect
            value={settingsData.paddingLeft}
            onChange={val => setSettingsData({ ...settingsData, paddingLeft: val })}
            options={getSizeOptions(0, 50)}
          />
        </div>
        <div className="input-box">
          <div className="label">Padding Right</div>
          <StyledSelect
            value={settingsData.paddingRight}
            onChange={val => setSettingsData({ ...settingsData, paddingRight: val })}
            options={getSizeOptions(0, 50)}
          />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Misc.</div>
        <div className="input-box">
          <div className="label">Translations for selections</div>
          <StyledSelect
            className="wide"
            value={settingsData.translations}
            onChange={val => setSettingsData({ ...settingsData, translations: val })}
            options={[{ label: "Enabled", value: "enabled" }, { label: "Disabled", value: "disabled" }]}
          />
        </div>
      </div>

      <div className="controls-wrapper">
        <Button className="reset" onClick={() => setSettingsData(defaultSettings)}>Reset to default</Button>
        <Button className="save" onClick={handleSaveSettings}>Save changes</Button>
      </div>
    </div>
  )
};

export default Settings;
