import React, { Children, cloneElement, FC, PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'

export const LinkTo: FC<PropsWithChildren<LinkProps & { target?: '_blank' }>> = ({
  target,
  children,
  href,
  ...props
}) => {
  const child: any = Children.only(children)
  return target === '_blank'
    ? cloneElement(child, { href, target })
    : (<Link href={href} {...props}>{child}</Link>)
}
