/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import createComponent from './createComponent'

const Handler = createComponent(() => ({
  defaultComponent: 'span',
  style: props => css`
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 100%;
    box-shadow: 0 1px 4px 0 ${props.theme.grey500};

    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    left: ${() => {
      if (props.offset >= 100) {
        return `calc(100% - 4px)`
      }
      if (props.offset < 100 && props.offset > 0) {
        return `calc(${props.offset}% - 6px)`
      }
      return '0'
    }};
    transition: left 50ms;
  `
}))

const Line = createComponent(() => ({
  style: props => css`
    width: 100%;
    height: 4px;
    background-color: #1a2a3a;
  `
}))

export default createComponent(() => ({
  style: props => css`
    position: relative;
    height: 24px;
    width: 100px;

    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  render: ({ Component, className, min, max, defaultValue, onChange }) => {
    const [v, setV] = useState(defaultValue)
    const [hold, setHold] = useState(false)
    const [positionX, setPositionX] = useState(0)
    const [width, setWidth] = useState(0)
    const measuredRef = useCallback(node => {
      if (node !== null) {
        setPositionX(node.getBoundingClientRect().left)
        setWidth(node.clientWidth)
      }
    }, [])
    const offsetleft = ((v - min) / (max - min)) * 100
    const changeValue = useCallback(
      value => {
        if (value >= min && value <= max) {
          onChange(value)
          setV(value)
        }
      },
      [onChange, setV, min, max]
    )
    const getPositionOfMouse = useCallback(
      e => {
        return e.pageX - positionX
      },
      [positionX]
    )
    const getPositionOfTouch = useCallback(
      e => {
        return e.touches[0].pageX - positionX
      },
      [positionX]
    )
    useEffect(() => {
      setV(defaultValue)
    }, [defaultValue])
    useEffect(() => {
      function listener() {
        setHold(false)
      }
      document.addEventListener('mouseup', listener)
      document.addEventListener('touchend', listener)
      function handleMove(e) {
        if (hold) {
          let offsetX = 0
          if (e.type === 'mousemove') {
            offsetX = getPositionOfMouse(e)
          } else {
            offsetX = getPositionOfTouch(e)
          }
          changeValue(Math.round((offsetX / width) * (max - min)) + min)
        }
      }

      document.addEventListener('mousemove', handleMove)
      document.addEventListener('touchmove', handleMove)

      return function removeListeners() {
        document.removeEventListener('mouseup', listener)
        document.removeEventListener('touchend', listener)
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('touchmove', handleMove)
      }
    }, [hold, changeValue, max, min, width, getPositionOfMouse, getPositionOfTouch])

    const handleStart = useCallback(
      e => {
        setHold(true)
        let offsetX = 0
        if (e.type === 'mousedown') {
          offsetX = getPositionOfMouse(e)
        } else {
          offsetX = getPositionOfTouch(e)
        }
        changeValue(Math.round((offsetX / width) * (max - min)) + min)
      },
      [changeValue, min, max, width, getPositionOfMouse, getPositionOfTouch]
    )

    return (
      <Component className={className} onMouseDown={handleStart} onTouchStart={handleStart}>
        <Line offset={offsetleft} ref={measuredRef} />
        <Handler offset={offsetleft} />
      </Component>
    )
  },
  defaultProps: {
    onChange: () => null
  },
  propTypes: {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    defaultValue: PropTypes.number.isRequired,
    onChange: PropTypes.func
  }
}))