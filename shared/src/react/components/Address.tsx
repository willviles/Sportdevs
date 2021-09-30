import React, { FC, HTMLAttributes } from 'react'

export const Address: FC<{
  address: { [key: string]: string },
  lineProps?: HTMLAttributes<HTMLSpanElement>,
  lineSeparator?: string
}> = ({
  address,
  lineProps,
  lineSeparator,
  ...props
}) => {
  const lines = Object.values(address)
  return (
    <address {...props}>
      {lines.map((line, i) => {
        const lastLine = i === lines.length - 1
        return (<span key={line} {...lineProps}>{line}{!lastLine && lineSeparator}</span>)
      })}
    </address>
  )
}
