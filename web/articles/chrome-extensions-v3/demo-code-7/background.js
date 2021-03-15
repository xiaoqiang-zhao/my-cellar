chrome.runtime.onMessage.addListener(request => {
  if (request.name === 'taskList') {
    debugger
  }
});
