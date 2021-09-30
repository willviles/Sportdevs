import { useMemo } from 'react'
import { useApp } from '../providers/App'

export const pageTitleDelimiter = ' - '

export const usePageTitle = (title?: string | string[]) => {
  const { meta } = useApp()

  const pageTitle = useMemo(() => (
    [
      ...(Array.isArray(title) ? title : [title]),
      ...(meta?.name ? [meta.name] : [])
    ]
      .filter(segment => segment?.length)
      .join(pageTitleDelimiter)
  ), [title])

  return pageTitle
}
