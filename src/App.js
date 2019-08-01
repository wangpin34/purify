/* eslint-disable no-undef */
import React, { useState, useEffect, useMemo } from 'react';
import styled, {ThemeProvider} from 'styled-components'
import themeProps from './theme'
import { getContent } from './dom'
import './App.css';

const Container = styled.div`
  font-size: 14px;
  display: ${props => props.enabled ? 'flex' : 'none'};
  width: 800px;
  margin: 2em auto;
  padding: 1em 3em;
  flex-direction: column;
  color: ${props => props.theme.color.font};
  background-color: ${props => props.theme.color.bg};
  box-shadow: 0 0 8px ${props => props.theme.color.primary};
`

const Header = styled.header`
  font-size: 22px;
  padding: 2em 0;
  margin: 0 auto;
`

const Toc = styled.aside`
  width: 200px;
  text-align: left;
  font-size: 14px;
  line-height: 2;
  padding: 1em;
  position: fixed;
  top: 100px;
  bottom: 50;
  left: 0;

  visibility: ${props => props.isShowToc ? 'visible' : 'hidden'};


  color: ${props => props.theme.color.font};
  background-color: ${props => props.theme.color.bg};
  box-shadow: 0 0 8px ${props => props.theme.color.primary};

  h1,h2,h3,h4,h5,h6 {
    font-weight: 500;
  }
`

const Main = styled.div`
  font-size: 16px;
  line-height: 1.8;
`

function App() {
  const [enabled, setEnabled] = useState(!(process.env.NODE_ENV === 'production'))
  const [theme, setTheme] = useState(themeProps.tree)
  const [isShowToc, setIsShowToc] = useState(false)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const article = useMemo(() => getContent(), [document.body.innerText])
  return (
    <ThemeProvider theme={theme}>
    <Container enabled={enabled}>
      <Header>
        {article.title}
      </Header>
      {article.doesContainToc ||
        (article.tocOrigin ? <Toc isShowToc={isShowToc} dangerouslySetInnerHTML={{__html: article.tocOrigin}}>
        </Toc> : <Toc isShowToc={isShowToc}>
          <ol>
        {article.toc.map(t => <li>{t.text}</li>)}
        </ol>
      </Toc>)
      }
      <Main dangerouslySetInnerHTML={{__html: article.main}}></Main>
    </Container>
    </ThemeProvider>
  );
}

export default App;
