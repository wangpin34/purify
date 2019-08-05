import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import theme from './theme'

function isUnderfined(obj) {
  return typeof obj === 'undefined'
}
function isFunc(obj) {
  return typeof obj === 'function'
}

const userEvents = [
  'onClick',
  'onMouseDown',
  'onMouseUp',
  'onTouchStart',
  'onTouchMove',
  'onTouchEnd',
  'onBlur',
  'onFocus',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',

  // automation flag
  'autoaction'
]

export function filterUserEventsFromProps(props) {
  return Object.keys(props)
    .filter(key => userEvents.indexOf(key) > -1)
    .reduce((a, c) => {
      if (isFunc(props[c]) || c === 'autoaction') {
        return { ...a, [c]: props[c] }
      }
      return a
    }, {})
}

function getProps(props, defaultProps) {
  return { ...defaultProps, ...props, theme }
}

const defaultStyle = props => css`
  line-height: 1.5;
`

function createComponent(getConf) {
  const conf = getConf()
  const { style, defaultComponent = 'div', render = ({ Component, ...rest }) => <Component {...rest} />, defaultProps, propTypes } = conf

  const InnerComponent = function RenderComponent({ as, forwardedRef, ...props }) {
    const Component = as || defaultComponent
    const renderProps = {
      ref: forwardedRef,
      Component,
      ...props
    }
    return render(renderProps)
  }

  const MemoComponent = React.memo(InnerComponent)

  function forwardRef(props, ref) {
    return <MemoComponent {...props} forwardedRef={ref} />
  }

  const RefComponent = React.forwardRef(forwardRef)

  const StyledComponent = styled(RefComponent)(p => {
    const props = getProps(p, defaultProps)
    const styles = [defaultStyle(props)]
    if (isFunc(style)) {
      styles.push(style(props))
    } else {
      styles.push(style)
    }
    return styles
  })
  StyledComponent.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    theme: PropTypes.object,
    ...propTypes
  }
  StyledComponent.defaultProps = {
    ...defaultProps
  }
  return StyledComponent
}

export default createComponent