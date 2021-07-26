const showLog = (txt) => {
  document.querySelector('.log').innerHTML += '<br><br>' + txt
}

const sendCommand = async (command) => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })

  browser.tabs.sendMessage(tabs[0].id, {
    command,
  })
}
const toggle = async () => {
  await sendCommand('toggle')
}
const refresh = async () => {
  await sendCommand('refresh')
}

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
    await browser.tabs.executeScript({ file: 'content_scripts/extension.js' })
  } catch (error) {
    reportExecuteScriptError(error)
  }
  listenForClicks()
})()
