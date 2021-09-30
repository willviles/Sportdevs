import React, { ButtonHTMLAttributes, HTMLAttributes, ReactChild, ReactChildren, ReactNodeArray } from 'react'
import clsx from 'clsx'
import { LinkProps } from 'next/link'
import { LinkTo } from './LinkTo'

export interface UnstyledButtonDefaultProps<T> {
  theme: T
  children?: string | ReactChild | ReactChildren | ReactNodeArray
  btnClassName?: (theme: T) => string
}

export type UnstyledButtonButtonProps<T> = ButtonHTMLAttributes<HTMLButtonElement> & UnstyledButtonDefaultProps<T> & {
  tag: 'button'
}

export type UnstyledButtonAnchorProps<T> = HTMLAttributes<HTMLAnchorElement> & Omit<LinkProps, 'children'> & UnstyledButtonDefaultProps<T> & {
  tag: 'a'
  target?: '_blank'
}

export type UnstyledButtonProps<T> = UnstyledButtonButtonProps<T> | UnstyledButtonAnchorProps<T>

export const UnstyledButton = <T, > ({
  children,
  tag = 'button',
  theme,
  btnClassName,
  className,
  ...props
}: UnstyledButtonProps<T>) => {
  const defaultClassName = 'inline-flex items-center font-black focus:outline-none ring ring-transparent'

  const propsWithClassName = {
    ...props,
    className: clsx(defaultClassName, btnClassName(theme), className)
  }

  switch (tag) {
    case 'button': {
      return (
        <button {...propsWithClassName as UnstyledButtonButtonProps<T>}>
          {children}
        </button>
      )
    }
    case 'a': {
      const { href, target, ...restProps } = propsWithClassName as UnstyledButtonAnchorProps<T>
      return (
        <LinkTo href={href} target={target}>
          <a {...restProps}>
            {children}
          </a>
        </LinkTo>
      )
    }
  }
}
