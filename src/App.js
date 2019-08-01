/* eslint-disable no-undef */
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components'
import { getContent } from './dom'
import './App.css';

const Container = styled.div`
  font-size: 14px;
  display: ${props => props.enabled ? 'flex' : 'none'};
  padding: 2em 5em 2em 300px;
  flex-direction: column;
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

  color: #000;
  background-color: #f4f4f4;

  h1,h2,h3,h4,h5,h6 {
    font-weight: 500;
  }
`

const Main = styled.div`
  font-size: 16px;
  line-height: 1.8;
`

function App() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    try {
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension")
          
          if (request.cmd === 'on') {
            setEnabled(true)
            document.body.style.display = 'none'
          }
          if (request.cmd === 'off') {
            setEnabled(false)
            document.body.style.display = ''
          }
  
          sendResponse({result: 'done'})
        });
    } catch(err) {
      // Ignore error
    }
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const article = useMemo(() => getContent(), [document.body.innerText])
  return (
    <Container enabled={enabled}>
      <Header>
        {article.title}
      </Header>
      {article.doesContainToc ||
        (article.tocOrigin ? <Toc dangerouslySetInnerHTML={{__html: article.tocOrigin}}>
        </Toc> : <Toc>
          <ol>
        {article.toc.map(t => <li>{t.text}</li>)}
        </ol>
      </Toc>)
      }
      <Main dangerouslySetInnerHTML={{__html: article.main}}></Main>
    </Container>
  );
}

export default App;
