import { createContext } from 'react'

import { UserStore } from './UserStore'
import { UIStore } from './UIStore'

export const userStore = createContext(new UserStore())
export const uiStore = createContext(new UIStore())
