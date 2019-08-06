/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components'
import read from 'node-readability'
import theme from './theme'
import Settings from './Settings'
import { SettingsIcon } from './Icon'
import Paper from './Paper'
import Toc from './Toc'
import Tool from './Tool'
import './App.css';

const themeStyle = (theme, userTheme) => css`
  color: ${theme.themes[userTheme].color};
  background-color: ${theme.themes[userTheme].bgColor};
`

const Container = styled.div`
  display: ${props => props.enabled ? 'flex' : 'none'};
  width: 800px;
  box-sizing: border-box;
  max-width: 100%;
  padding: 24px;
  margin: 0 auto;
  flex-direction: column;
  ${props => themeStyle(props.theme, props.userTheme)};
  box-shadow: 0 0 8px ${props => props.theme.themes[props.userTheme].bgColor};

  div.purify, p.purify, section.purify, article.purify {
    margin: 0.5em 0;
    ${props => themeStyle(props.theme, props.userTheme)};
    font-size: ${props => props.userFontSize}px;
  }

  a.purify, a.purify:link, a.purify:visited, a.purify:hover, a.purify:focus {
    color: #3498db;
  } 

  pre.purify, code.purify, br.purify {
    margin: 1em 0;
  }

  img.purify, svg, canvas.purify {
    max-width: 100%;
    margin: 0.3em 0;
  }
`

function App() {
  const [enabled, setEnabled] = useState(!(process.env.NODE_ENV === 'production'))
  const [userTheme, setUserTheme] = useState('default')
  const [userFontSize, setUserFontSize] = useState(14)

  const [article, setArticle] = useState({})
  
  const [toc, setToc] = useState([])
  const [showToc, setShowToc] = useState(false)

  useEffect(() => {
    read(document.body.innerHTML, function(err, articleInHtml, meta) {
      const html = articleInHtml.content
      const dom = document.createElement('div')
      dom.innerHTML = html

      const headers = []

      Array.from(dom.querySelectorAll('*')).forEach(n => n.classList.add('purify'))
      Array.from(dom.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach(n => {
        let a = document.createElement('a')
        a.name = n.innerText
        a.innerText = n.innerText
        n.innerHTML = a.outerHTML

        const header = document.createElement(n.tagName.toLowerCase())
        header.classList.add('toc')
        let alink = document.createElement('a')
        alink.href = `#${a.name}`
        alink.innerText = n.innerText
        header.innerHTML = alink.outerHTML

        headers.push(header)
      })
      setArticle({title: articleInHtml.title, content: dom.innerHTML})
      setToc(headers)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.body.innerText])

  useEffect(() => {
    try {
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension")
          
          if (request.cmd === 'on') {
            setEnabled(true)
          }
          if (request.cmd === 'off') {
            setEnabled(false)
          }
  
          sendResponse({result: 'done'})
        });
    } catch(err) {
      // Ignore error
    }
  }, [])
  useEffect(() => {
    if (enabled) {
      document.body.style.display = 'none'
    } else {
      document.body.style.display = ''
    }
  }, [enabled])
  return (
    <ThemeProvider theme={theme}>
      <Container enabled={enabled} userTheme={userTheme} userFontSize={userFontSize}>
        { showToc && <Toc toc={toc} handleClose={() => setShowToc(false)}/> }
        <Paper article={article} />
        <Tool toggleToc={() => setShowToc(!showToc)}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
