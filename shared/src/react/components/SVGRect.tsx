import React, { FC, useState, useEffect, HTMLAttributes } from 'react'

const getWidthHeightFromRatio = ({ _ratio, _width, _height }) => {
  const ratio = _ratio ?? '16:9'
  return {
    width: _width ?? ratio.split(':')[0],
    height: _height ?? ratio.split(':')[1]
  }
}

export const SVGRect: FC<HTMLAttributes<HTMLOrSVGElement> & {
  height?: string
  ratio?: string
  width?: string
}> = ({
  height: _height,
  ratio: _ratio,
  width: _width,
  ...props
}) => {
  const {
    width: initialWidth,
    height: initialHeight
  } = getWidthHeightFromRatio({ _ratio, _width, _height })

  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)

  useEffect(() => {
    const { width, height } = getWidthHeightFromRatio({ _ratio, _width, _height })
    setWidth(width)
    setHeight(height)
  }, [_height, _ratio, _width])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} {...props}>
      <rect width={width} height={height} fill="none" />
    </svg>
  )
}
