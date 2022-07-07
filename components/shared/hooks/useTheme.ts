import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Theme, ThemeState } from 'shared/types/theme'
import { pallets } from 'shared/utils/color'

// state
export const themeState = atom<Theme>({
  key: 'theme',
  default: {
    state: 'light',
    color: pallets.light
  }
})

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState)

  const getThemeColor = (state: ThemeState) => {
    return state === 'light' ? pallets.light : pallets.dark
  }

  const toggleTheme = () => {
    const current = theme.state === 'light' ? 'dark' : 'light'
    setTheme({
      state: current,
      color: getThemeColor(current)
    })
  }

  useEffect(() => {
    const current = theme.state === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('cozy-theme', current)
  }, [theme])

  return { theme, toggleTheme }
}
