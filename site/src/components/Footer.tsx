import { FC, HTMLAttributes } from 'react'
import { useApp } from 'app/providers/App'
import { ReactComponent as LogoText } from 'brand/logos/logo-text.svg?sprite'
import { ReactComponent as DiscordIcon } from 'brand/icons/discord.svg?sprite'
import { ReactComponent as GithubIcon } from 'brand/icons/github.svg?sprite'
import clsx from 'clsx'
import { Button } from './Button'
import { useAnalytics } from '../providers/Analytics'

export const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { meta } = useApp()
  const { track } = useAnalytics()

  return (
    <footer className={clsx('py-16', className)} {...props}>
      <div className="container-lg mx-auto">
        <div className="flex flex-col-reverse gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2 text-sm pl-[0.5em]">
            <LogoText className="inline-block h-[2em] mb-4" />
            <div className="copyright">
              {meta.copyright}
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 lg:items-start lg:justify-end">
            {(() => {
              const btnProps = {
                className: clsx(
                  'rounded font-bold',
                  'p-2'
                ),
                theme: 'primary'
              }

              return (<>
                <ul className="flex justify-end gap-3">
                  <li>
                    <Button
                      tag="a"
                      href={meta.links.discord}
                      target="_blank"
                      {...btnProps as any}
                      onClick={() => track('DiscordLinkClick')}
                    >
                      <DiscordIcon className="h-[1.5em]" />
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
      </div>
    </footer>
  )
}
