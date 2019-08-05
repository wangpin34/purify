/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components'
import theme from './theme'
import read from 'node-readability'
import Settings from './Settings'
import { SettingsIcon } from './Icon'
import './App.css';

const Container = styled.div`
  font-size: ${props => props.userFontSize}px;
  display: ${props => props.enabled ? 'flex' : 'none'};
  width: 800px;
  margin: 0 auto 300px;
  padding: 1em 3em;
  flex-direction: column;
  color: ${props => props.theme.themes[props.userTheme].color};
  background-color: ${props => props.theme.themes[props.userTheme].bgColor};
  box-shadow: 0 0 8px ${props => props.theme.themes[props.userTheme].bgColor};

  ${SettingsIcon} {
    box-sizing: content-box;
    position: fixed;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    margin: 8px;
    &:hover {
      border-radius: 100%;
      border: 8px solid #dddddd;
    }
  }
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
  font-size: ${props => props.userFontSize}px;
  color: ${props => props.theme.themes[props.userTheme].color};
  background-color: ${props => props.theme.themes[props.userTheme].bgColor};
  line-height: 1.8;
`

function App() {
  const [enabled, setEnabled] = useState(!(process.env.NODE_ENV === 'production'))
  const [userTheme, setUserTheme] = useState('default')
  const [userFontSize, setUserFontSize] = useState(14)
  const [showSettings, setShowSettings] = useState(false)
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
  const [article, setArticle] = useState({title: '', content: ''})
  useEffect(() => {
    read(document.body.innerHTML, function(err, articleInHtml, meta) {
      setArticle(articleInHtml)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.body.innerText])
  return (
    <ThemeProvider theme={theme}>
      <Container enabled={enabled} userTheme={userTheme}>
        <Header>
          {article.title}
        </Header>
        {/* {article.doesContainToc ||
          (article.tocOrigin ? <Toc isShowToc={isShowToc} dangerouslySetInnerHTML={{__html: article.tocOrigin}}>
          </Toc> : <Toc isShowToc={isShowToc}>
            <ol>
          {article.toc.map(t => <li>{t.text}</li>)}
          </ol>
        </Toc>)
        } */}
        <SettingsIcon width={24} height={24} onClick={() => setShowSettings(!showSettings)}/>
        { showSettings && <Settings setUserTheme={setUserTheme} userFontSize={userFontSize} setUserFontSize={setUserFontSize}/> }
        <Main dangerouslySetInnerHTML={{__html: article.content}} userFontSize={userFontSize}userTheme={userTheme}>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
