import { ReactNode } from 'react'

export interface Button {
  text: string
  className?: string
  classNameExt?: string
  isFullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  href?: string
}
