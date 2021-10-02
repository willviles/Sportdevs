import { FC, HTMLAttributes } from 'react'
import { useApp } from 'app/providers/App'
import { ReactComponent as LogoText } from 'brand/logos/logo-text.svg?sprite'
import clsx from 'clsx'

export const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { meta } = useApp()

  return (
    <footer className={clsx('py-16 bg-primary-900', className)} {...props}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 text-sm pl-[0.5em]">
            <LogoText className="inline-block h-[2em] mb-4" />
            <div className="copyright">
              {meta.copyright}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
