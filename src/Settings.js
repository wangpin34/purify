/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo, useCallback } from 'react'
import styled, { css } from 'styled-components'
import createComponent from './createComponent'
import Slider from './Slider'

const ThemeItem = styled.span`
  border-radius: 100%;
  width: 48px;
  height: 48px;
  display: inline-block;
  color: ${props => props.theme.themes[props.userTheme].color};
  background-color: ${props => props.theme.themes[props.userTheme].bgColor};
`

const Theme = ({userTheme, ...rest}) => <ThemeItem userTheme={userTheme} {...rest}/>

// Light themes
const DefaultTheme = props => <Theme userTheme="default" {...props} />

// Dark themes
const NightTheme = props => <Theme userTheme="night" {...props} />

const Container = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #cccccc;
  font-size: 14px;
  padding: 1em 2em;
  width: 800px;
  margin: 0 auto;
  left: 0;
  right: 0;
  box-shadow: 0 -8px 4px #cccccc;

  ul.tabs-header {
    list-style: none;
    display: flex;
    justify-content: space-around;
    li {
      display: inline;
      svg {
        width: 32px;
        height: 32px;
      }
    }
  }
`

const ThemeContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const FontContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const FontIcon = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="3" strokeLinecap="square" strokeLinejoin="arcs"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>

const ThemeIcon = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="3" strokeLinecap="square" strokeLinejoin="arcs"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>

const Settings = createComponent(() => ({
  style: props => css`
    position: fixed;
  bottom: 0;
  background-color: #cccccc;
  font-size: 14px;
  padding: 1em 2em;
  width: 800px;
  margin: 0 auto;
  left: 0;
  right: 0;
  box-shadow: 0 -8px 4px #cccccc;

  ${Slider} {
    width: 400px;
  }

  ul.tabs-header {
    list-style: none;
    display: flex;
    justify-content: space-around;
    li {
      display: inline;
      svg {
        width: 32px;
        height: 32px;
      }
    }
  }
  `,
  render: ({Component, className, userFontSize, setUserTheme, setUserFontSize}) => {
    const [tab, setTab] = useState(null)
    const closeTab = useCallback(callback => {
      setTab(null)
      callback()
    }, [setTab])
    const activeTab = useMemo(() => {
    switch(tab) {
      case 'font': 
        return (
          <FontContainer>
            <FontIcon width={16} height={16}/>
            <Slider min={14} max={32} defaultValue={userFontSize} onChange={value => setUserFontSize(value)}/>
            <FontIcon width={32} height={32}/>
          </FontContainer>
        )
      case 'theme':
        return (
          <ThemeContainer>
            <DefaultTheme onClick={() => closeTab(() => setUserTheme('default'))}/>
            <NightTheme onClick={() => closeTab(() => setUserTheme('night'))}/>
          </ThemeContainer>
        )
      default:
        return null
    }
  }, [tab])
  return <Component className={className}>

      {/* Theme */}
      { Boolean(tab) ||
      <ul className="tabs-header">
        <li>
          <ThemeIcon onClick={() => setTab('theme')} width={32} height={32}/>
        </li>
        <li>
          <FontIcon onClick={() => setTab('font')} width={32} height={32}/>
        </li>
      </ul>}
      {activeTab}
    
    </Component>
  }
}))

export default Settings