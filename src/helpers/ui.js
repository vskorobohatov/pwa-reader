export const isElementInViewport = el => {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}

export const getSelectionText = () => {
  let text = "";

  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }

  return text;
}

export const defaultSettings = {
  // Basic
  fontSize: `16px`,
  fontFamily: "GeneralSans",
  background: "#FFFFFF",
  color: "#000000",
  // Paddings
  paddingTop: `20px`,
  paddingBottom: `20px`,
  paddingLeft: `20px`,
  paddingRight: `20px`,
  // Misc
  translations: "enabled",
  textAlign: "justify"
};

export const getSavedSettings = () => {
  const settings = localStorage.getItem("settings");
  if (settings) {
    return JSON.parse(settings);
  }
  return defaultSettings;
};

export const saveSettings = settings => {
  localStorage.setItem("settings", JSON.stringify(settings));

};