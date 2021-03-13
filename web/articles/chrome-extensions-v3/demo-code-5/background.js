let total = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ total });
});
