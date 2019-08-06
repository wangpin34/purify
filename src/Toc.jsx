/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { css } from 'styled-components'
import createComponent from './createComponent'

export default createComponent(() => ({
  style: props => css`
    background-color: #eeeeee;
    padding: 64px 8px 32px;
    position: fixed;
    top: 0;
    left: 0;
    width: 240px;
    height: 100vh;

    display: flex;
    flex-direction: column;

    box-shadow: 4px 0 4px #eeeeee;


    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      background-color: hsla(120, 57%, 95%, 0.4)
    }

    .toc-content {
      & > h1.toc, & > h2.toc, & > h3.toc, & > h4.toc, & > h5.toc, & > h6.toc {
        font-size: 14px;
        margin: 0.5em 0;
        background-color: unset;
        a, a:link, a:visited, a:visited, a:hover {
          color: #3498db;;
          text-decoration: none;
        }
      }
    }
  `,
  render: ({Component, className, toc, handleClose}) => {
    return (
      <Component className={className} onClick={handleClose}>
        <div className="toc-content" dangerouslySetInnerHTML={{__html: toc.map(t => t.outerHTML).join('')}}></div>
      </Component>
    )
  }
}))