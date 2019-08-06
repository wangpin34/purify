import React from 'react'
import createComponent from './createComponent'
import { css } from 'styled-components'

export const SettingsIcon = createComponent(() => ({
  style: props => css`
    display: inline-block;
  `,
  render: ({Component, ...rest}) => <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="1" strokeLinecap="square" strokeLinejoin="arcs"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
}))

export const FontIcon = createComponent(() => ({
  style: props => css`
    display: inline-block;
  `,
  render: ({Component, ...rest}) => <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="1" strokeLinecap="square" strokeLinejoin="arcs"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
}))

export const ThemeIcon = createComponent(() => ({
  style: props => css`
    display: inline-block;
  `,
  render: ({Component, ...rest}) => <svg {...rest} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="1" strokeLinecap="square" strokeLinejoin="arcs"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
}))

export const ArrowLeft = createComponent(() => ({
  style: props => css`
    display: inline-block;
  `,
  render: ({Compnent, ...rest}) => <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="arcs"><path d="M15 18l-6-6 6-6"/></svg>
}))

export const ArrowRight = createComponent(() => ({
  style: props => css`
    display: inline-block;
  `,
  render: ({Compnent, ...rest}) => <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="arcs"><path d="M9 18l6-6-6-6"/></svg>
}))

export const ListIcon = createComponent(() => ({
  style: props => css`
    display: inline-block;
  `,
  render: ({Compnent, ...rest}) => <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="arcs"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
}))

export const FullIcon = createComponent(() => ({
  style: props => css`
    display: inline-block;
  `,
  render: ({Compnent, ...rest}) => <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="arcs"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
}))

