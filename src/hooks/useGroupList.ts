import { createContext, useContext } from 'react'
import type { GroupItem } from '../types/api/group.type'

export const GroupContext = createContext<GroupItem[]>([])

export const useGroups = () => useContext(GroupContext)
