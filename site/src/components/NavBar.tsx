import { FC, HTMLAttributes, useState } from 'react'
import Link from 'next/link'
import { useSpring, useTransition, animated } from 'react-spring'
import { easeExpOut } from 'd3-ease'
import Sticky from 'react-stickynode'
import { Button } from 'app/components/Button'
import { ReactComponent as LogoText } from 'brand/logos/logo-text.svg?sprite'
import { ReactComponent as DiscordIcon } from 'brand/icons/discord.svg?sprite'
import { ReactComponent as GithubIcon } from 'brand/icons/github.svg?sprite'
import { isSSR } from 'shared/dist/next/helpers/ssr'
import clsx from 'clsx'
import { useAnalytics } from '../providers/Analytics'
import { useApp } from '../providers/App'

export const NavBar: FC<HTMLAttributes<HTMLDivElement> & {
  stickyProps?: Omit<Sticky.Props, 'children'>
}> = ({
  stickyProps,
  className,
  ...props
}) => {
  const { meta } = useApp()
  const { track } = useAnalytics()

  const [navBarMobileOpen, setNavBarMobileOpen] = useState(false)

  return (
    <Sticky
      {...stickyProps}
      enabled={stickyProps.enabled !== false && !isSSR}
      innerZ={49}
    >
      {status => (
        <nav
          className={clsx(className, 'relative')}
          {...props}
        >
          <div className={clsx({
            'backdrop-filter-body-bg': status.status === Sticky.STATUS_FIXED
          })}>
            <div
              className={clsx(
                'container-lg mx-auto flex items-center',
                status.status === Sticky.STATUS_FIXED
                  ? 'py-2 xl:py-3 3xl:py-4'
                  : 'py-4 xl:py-5 3xl:py-6'
              )}
            >
              <div className="flex-shrink-0">
                <Link href="/">
                  <a
                    className={clsx('inline-block py-3')}
                  >
                    <LogoText
                      key="navbar-logo-text"
                      className={clsx(
                        'inline-block',
                        status.status === Sticky.STATUS_FIXED
                          ? 'h-[2.1em] 2xl:h-[2.5em]'
                          : 'h-[2.1em] md:h-10 2xl:h-12'
                      )}
                    />
                  </a>
                </Link>
              </div>
              {(() => {
                const btnProps = {
                  className: clsx(
                    'rounded font-bold',
                    'p-2'
                  ),
                  theme: 'primary'
                }

                return (<>
                  {/* <ul className="flex-1 flex justify-end lg:hidden -mr-3 md:mr-0">
                    <li>
                      <Button
                        tag="button"
                        onClick={() => setNavBarMobileOpen(!navBarMobileOpen)}
                        {...btnProps as any}
                      >
                        <Burger open={navBarMobileOpen} className="h-[2em]" />
                      </Button>
                    </li>
                  </ul> */}
                  <ul className="hidden flex-1 lg:flex justify-end gap-3">
                    <li>
                      <Button
                        tag="a"
                        href={meta.links.discord}
                        target="_blank"
                        {...btnProps as any}
                        onClick={() => track('DiscordLinkClick')}
                      >
                        <DiscordIcon className="h-[1.5em] mr-[0.66em]" />
                        <span>Join the Discord</span>
                      </Button>
                    </li>
                    <li>
                      <Button
                        tag="a"
                        href={meta.links.github}
                        target="_blank"
                        {...btnProps as any}
                      >
                        <GithubIcon className="h-[1.5em]" />
                      </Button>
                    </li>
                  </ul>
                </>)
              })()}
            </div>
          </div>
          <NavBarMobile open={navBarMobileOpen} />
        </nav>
      )}
    </Sticky>
  )
}

const Burger: FC<HTMLAttributes<SVGElement> & {
  open: boolean
}> = ({
  open,
  style = {},
  ...props
}) => {
  const first = useSpring({
    transform: open
      ? 'translate(10px, 0px)'
      : 'translate(10px, 13px)',
    opacity: open ? 0 : 1
  })
  const second = useSpring({
    transform: open
      ? 'translate(10px, 23px) rotate(45deg)'
      : 'translate(10px, 23px) rotate(0deg)',
    transformOrigin: 'center',
    transformBox: 'fill-box'
  })
  const third = useSpring({
    transform: open
      ? 'translate(10px, 23px) rotate(-45deg)'
      : 'translate(10px, 23px) rotate(0deg)',
    opacity: open ? 1 : 0,
    transformOrigin: 'center',
    transformBox: 'fill-box'
  })
  const fourth = useSpring({
    transform: open
      ? 'translate(10px, 50px)'
      : 'translate(10px, 33px)',
    opacity: open ? 0 : 1
  })

  return (
    <svg
      viewBox="0 0 50 50"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...style,
        transformBox: 'fill-box'
      }}
      {...props}
    >
      <animated.rect width="30" height="4" rx="2" style={first} />
      <animated.rect width="30" height="4" rx="2" style={second as any} />
      <animated.rect width="30" height="4" rx="2" style={third as any} />
      <animated.rect width="30" height="4" rx="2" style={fourth} />
    </svg>
  )
}

const NavBarMobile: FC<HTMLAttributes<HTMLDivElement> & {
  open: boolean
}> = ({
  open,
  className,
  ...props
}) => {
  const transitions = useTransition(open, {
    config: {
      duration: 500,
      easing: easeExpOut
    },
    from: {
      transformOrigin: '0 0',
      opacity: 0,
      transform: 'translate3d(-50%, 0, 0)'
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%, 0, 0)'
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(0%, -50%, 0)'
    }
  })
  return transitions((style, item) => (
    item && (
      <animated.div
        {...props}
        key="nav-bar-mobile"
        style={style}
        className={clsx(
          className,
          'absolute left-0 w-full top-[100%]',
          'box-border',
          'shadow-2xl z-50',
          'overflow-y-auto',
          'backdrop-filter-body-bg text-body-text'
        )}
      >
        <div className="container mx-auto my-6">
          <ul className="grid grid-cols-1 gap-4">
            <li>
              <Button
                tag="a"
                theme="primary"
                href="/contact"
                className="w-full items-center justify-center px-6 py-4 rounded-xl text-lg"
              >
                <span>Contact Us</span>
              </Button>
            </li>
          </ul>
        </div>
      </animated.div>
    )
  ))
}
