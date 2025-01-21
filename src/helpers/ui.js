import { defaultSettings } from "./defaults";

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

export const getSavedValue = key => {
  const settings = localStorage.getItem(key);
  if (settings) {
    return JSON.parse(settings);
  }
  return defaultSettings;
};

export const saveValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

