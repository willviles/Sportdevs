import { UnstyledButton, UnstyledButtonProps } from 'shared/dist/react/components/UnstyledButton'
import clsx from 'clsx'

export const ButtonThemes = ['white', 'primary'] as const
export type ButtonTheme = typeof ButtonThemes[number]

export type ButtonProps = UnstyledButtonProps<ButtonTheme>

export const Button = ({
  theme,
  ...props
}: ButtonProps) => {
  return (
    <UnstyledButton
      {...props}
      theme={theme ?? 'primary'}
      btnClassName={(theme) => {
        const defaultClassName = ''
        switch (theme) {
          case 'white': {
            return clsx(defaultClassName, 'bg-white/30 hover:bg-white hover:text-body-bg hover:ring-white/30 focus:bg-white/90 focus:text-body-bg focus:ring-white/30 disabled:bg-white/50')
          }
          case 'primary': {
            return clsx(defaultClassName, 'bg-primary-500 text-white hover:bg-primary-400 hover:ring-primary-500/30 focus:bg-primary-400/90 focus:ring-primary-500/30 disabled:bg-primary-500/50')
          }
        }
      }}
    />
  )
}
