(() => {
  const html = document.querySelector('html')
  const attr = document.createAttribute('showing-wireframes')

  const STATE = {
    on: false
  }

  const onMessage = ({ command }) => {
    console.log('command', command)

    switch (command) {
      case 'toggle':
        toggleExtension()
        break
      case 'refresh':
        setColors()
        break
      default:
        null
    }
  }

  const toggleExtension = () => {
    if (!STATE.on) enableExtension()
    else disableExtension()
  }

  const enableExtension = () => {
    STATE.on = true
    console.log('enable')
    attr.value = 'true'
    applyAttr()
  }
  const disableExtension = () => {
    STATE.on = false
    console.log('disable')
    attr.value = 'false'
    applyAttr()
  }

  const applyAttr = () => html.attributes.setNamedItem(attr)


  const setColors = () => {
    const nodes = document.querySelectorAll('body *')
    nodes.forEach(node => {
      node.style.setProperty('--__wireframes-local-color__', getRandomColor())
    })
  }


  const getRandomColor = (() => {
    const iterator = [1, 2, 3]
    return () => `rgb(${iterator.map(() => 255 * Math.random()).join()})`
  })()

  // ------------------------------------------
  browser.runtime.onMessage.addListener(onMessage)

  console.log('extension loaded')
  setColors()
  // enableExtension()
})()