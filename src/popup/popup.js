const IS_CHROME = Boolean(typeof chrome !== 'undefined' && typeof browser === 'undefined')
const _browser = IS_CHROME && chrome || browser

const showLog = (txt) => document.querySelector('.log').innerHTML += '<br><br>' + txt
const showError = (error) => document.querySelector('.error').innerHTML += '<br><br>' + error

// ---------------------
const query = IS_CHROME && ((args) => new Promise((resolve) => _browser.tabs.query(args, resolve))) || _browser.tabs.query
const sendCommand = async (command) => {
  const tabs = await query({ active: true, currentWindow: true })

  _browser.tabs.sendMessage(tabs[0].id, {
    command,
  })
}
const toggle = async () => {
  await sendCommand('toggle')
}
const refresh = async () => {
  await sendCommand('refresh')
}
// ---------------------
function listenForClicks () {
  document.querySelector('button#toggle-btn').addEventListener('click', toggle)
  document.querySelector('button#refresh-btn').addEventListener('click', refresh)
}

function reportExecuteScriptError (error) {
  // TODO handle
  // document.querySelector('.error').innerText = error
}

(async () => {
  try {
    await _browser.tabs.executeScript({ file: 'content_scripts/extension.js' })
  } catch (error) {
    reportExecuteScriptError(error)
  }
  listenForClicks()
})()
