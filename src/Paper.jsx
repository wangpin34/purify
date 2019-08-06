/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { css } from 'styled-components'
import createComponent from './createComponent'

export default createComponent(() => ({
  style: props => css`
    width: 800px;
    box-sizing: border-box;
    max-width: 100%;
    padding: 24px;
    margin: 0 auto;
    flex-direction: column;

    h1.purify, h2.purify, h3.purify, h4.purify, h5.purify, h6.purify {
      margin: 0.5em 0;
      font-weight: normal;
    }

    h1.purify {
      font-size: 1.6em;
    }
    h2.purify {
      font-size: 1.5em;
    }
    h3.purify {
      font-size: 1.4em;
    }
    h4.purify {
      font-size: 1.3em;
    }
    h5.purify {
      font-size: 1.2em;
    }
    h6.purify {
      font-size: 1.1em;
    }
  `,
  render: ({Component, className, article}) => {
    return (
      <Component className={className}>
        <header>{article.title}</header>
        <main dangerouslySetInnerHTML={{__html: article.content}}>

        </main>
      </Component>
    )
  }
}))

