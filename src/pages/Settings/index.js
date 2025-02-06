import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { defaultSettings } from "helpers/defaults";
import { fontFamilyOptions, textAlignOptions, themes } from "./options";
import { setHeaderSideComponent, setHeaderSideComponentProps } from "store/reducers/ui";
import { setSettings } from "store/reducers/settings";

import StyledSelect from "components/StyledSelect";
import { resetSettingsButtonKey } from "components/ResetSettingsButton";

import "./styles.scss";

export const SettingsContent = () => {
  const dispatch = useDispatch();
  const settingsData = useSelector(store => store.settings.values);

  const setSettingsData = values => dispatch(setSettings(values));

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
        <div className="section-title">Themes</div>
        <div className="themes-wrapper">
          {themes.map(({ color, background, label }) => {
            const isActive = settingsData.color === color && settingsData.background === background;
            return (
              <div className="theme-item">
                <div className={`state-wrapper ${isActive ? "active" : ""}`} onClick={() => setSettingsData({ color, background })}>
                  <div className="preview" style={{ color, background }}>Aa</div>
                  <div className="label">{label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

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
          <div className="label">Align text</div>
          <StyledSelect
            className="wide"
            value={settingsData.textAlign}
            onChange={val => setSettingsData({ ...settingsData, textAlign: val })}
            options={textAlignOptions}
          />
        </div>
        <div className="input-box">
          <div className="label">Translations for selection</div>
          <StyledSelect
            className="wide"
            value={settingsData.translations}
            onChange={val => setSettingsData({ ...settingsData, translations: val })}
            options={[{ label: "Enabled", value: "enabled" }, { label: "Disabled", value: "disabled" }]}
          />
        </div>
      </div>
    </div>
  )
}

const SettingsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateHeader(resetSettingsButtonKey);

    return () => {
      updateHeader();
    }
  }, []);

  const updateHeader = (val = null, props = null) => {
    dispatch(setHeaderSideComponent(val));
    dispatch(setHeaderSideComponentProps(props));
  };

  return <SettingsContent />
};

export default SettingsPage;
