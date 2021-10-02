import { FC, HTMLAttributes } from 'react'
import { useApp } from 'app/providers/App'
import { ReactComponent as LogoText } from 'brand/logos/logo-text.svg?sprite'
import { ReactComponent as DiscordIcon } from 'brand/icons/discord.svg?sprite'
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
    <footer className={clsx('py-16 bg-primary-900', className)} {...props}>
      <div className="container mx-auto">
        <div className="flex flex-col-reverse gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2 text-sm pl-[0.5em]">
            <LogoText className="inline-block h-[2em] mb-4" />
            <div className="copyright">
              {meta.copyright}
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 lg:items-start lg:justify-end">
            <Button
              tag="a"
              theme="primary"
              href={meta.links.discord}
              target="_blank"
              className="inline-flex py-3 px-4 font-bold rounded"
              onClick={() => track('DiscordLinkClick')}
            >
              <DiscordIcon className="h-[1em] mr-[0.5em]" />
              <span>Join the Discord</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
