// NOTE: Do to the need to for interacting directly with the browser in this file, it will be ignored for testing
// coverage

import {buildUrlFromStr} from "./helpers";

declare var document: any;
declare var window: any;

export function copyToClipboardFromId(id: string): void {
  const element = document.querySelector(`#${id}`);
  const originalType = element.type;
  if (originalType === "password") {
    element.type = "text";
  }
  element.select();
  document.execCommand("copy");
  element.type = originalType;
  return;
}

// Stolen from :
// https://stackoverflow.com/questions/127040/copy-put-text-on-the-clipboard-with-firefox-safari-and-chrome
export function copyStringToClipboard(str: string): void {
  const handler = (event: any) => {
      event.clipboardData.setData("text/plain", str);
      event.preventDefault();
      document.removeEventListener("copy", handler, true);
  };

  document.addEventListener("copy", handler, true);
  document.execCommand("copy");
  return;
}

export function openInputTextInNewTab(id: string): void {
  const element = document.querySelector(`#${id}`);
  const url = buildUrlFromStr(element.value);
  const tab = window.open(url);
  tab.focus();
  return;
}

export function changeWindowLocation(url: string): void {
  window.location = url;
  return;
}

export function alert(str: string): void {
  window.alert(str);
  return;
}

export function localStorageSetItem(key: string, item: any): void {
  window.localStorage.setItem(key, item);
  return;
}

export function localStorageGetItem(key: string): any {
  return window.localStorage.getItem(key);
}

export function localStorageRemoveItem(key: string): void {
  window.localStorage.removeItem(key);
  return;
}

export function getLocationHash(): string {
  return window.location.hash;
}

export function getElementById(id: string): any {
  return document.getElementById(id);
}
