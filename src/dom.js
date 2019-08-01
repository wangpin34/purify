export function removeNode(node) {
  if(node.parentElement) {
    node.parentElement.removeChild(node)
  }
}

export function removeSelectedNode(node, selector) {
  Array.from(node.querySelectorAll(selector)).forEach(removeNode)
}

export function removeAttribute(node) {
  node.removeAttribute('class')
  node.removeAttribute('id')
  node.removeAttribute('name')
  node.removeAttribute('style')
  node.removeAttribute('width')
  node.removeAttribute('height')

  node.removeAttribute('onclick')
}

export function removeAttrsFromSub(node) {
  Array.from(node.querySelectorAll('*')).forEach(removeAttribute)
}

export function getContentNode(node) {
  if (!node) {
    node = document.body
  }
  let nodes = Array.from(node.querySelectorAll('[id*=content],[class*=content],[name*=content]'))
  let aloneNodes = []
  if (nodes.length > 0) {
    aloneNodes = nodes.filter((n, index) => {
      let others = [...nodes.slice(0, index), ...nodes.slice(index + 1)]
      return !others.find(o => n.contains(o))
    })
  }
  let largestNode = aloneNodes[0]
  if (aloneNodes.length > 1) {
    aloneNodes.forEach(n => {
      if (n.innerText.length > largestNode.innerText.length) {
        largestNode = n
      }
    })
  }
  return largestNode
}


export function getContent() {
  const title = document.querySelector('title').innerText

  const main = document.createElement('div')
  main.innerHTML = (document.body.querySelector('article') || document.body).innerHTML
  removeSelectedNode(main, 'script, link, nav, footer, header, aside')
  const contentNode = getContentNode(main) || main
  removeAttrsFromSub(contentNode)

  const tocOrigin = contentNode.querySelector('[id*=toc], [name*=toc], [class*=toc]') ||  document.querySelector('[id*=toc], [name*=toc], [class*=toc]')
  const toc = Array.from(contentNode.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(header => ({tag: header.tagName.toLowerCase(), text: header.innerText }))

  return {
    title,
    toc,
    tocOrigin: tocOrigin && tocOrigin.innerHTMl,
    main: contentNode && contentNode.innerHTML,
    doesContainToc: !!contentNode.querySelector('[id*=toc], [name*=toc], [class*=toc]')
  }
}
