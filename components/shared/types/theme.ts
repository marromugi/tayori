import { Color } from './color'

export type ThemeState = 'light' | 'dark'

export type Theme = {
  state: ThemeState
  color: Color
}
