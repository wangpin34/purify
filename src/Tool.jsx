/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { css } from 'styled-components'
import createComponent from './createComponent'
import { ArrowLeft, ArrowRight, FontIcon, SettingsIcon, ListIcon, FullIcon } from './Icon'

const Kit = createComponent(() => ({
  style: props => css`
    margin: 0;
    padding: 0.5em;
    background-color: #fff;
  `,
  render: ({ className, toggleToc }) => (<React.Fragment>
    <ListIcon className={className} width={20} height={20} onClick={toggleToc}/>
    <SettingsIcon className={className} width={20} height={20} />
    <FullIcon className={className} width={20} height={20} onClick={() => {
      document.getElementById('purify-reader').requestFullscreen()
    }} />
  </React.Fragment>)
}))

export default createComponent(() => ({
  style: props => css`
    position: fixed;
    right: 0;
    height: 48px;
    margin: 0;
    padding: 0 0.5em 0 1em;
    color: #1a2a3a;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1px solid #dddddd;
    border-radius: 48px 0 0 48px;

    &[data-collapsed='collapsed'] {
      width: fit-content;
    }
  `,
  render: ({Component, className, toggleToc}) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <Component className={className} data-collapsed={collapsed ? 'collapsed' : ''}>
        { collapsed ? <ArrowRight width={24} height={24} onClick={() => setCollapsed(false)}/> : <ArrowLeft width={24} height={24} onClick={() => setCollapsed(true)}/>}
        {
          collapsed && <Kit toggleToc={toggleToc}/>
        }
      </Component>
    )
  }
}))