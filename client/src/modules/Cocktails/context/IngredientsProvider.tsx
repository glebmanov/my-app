import React, { FC, ReactNode, createContext, useContext, useMemo, useState } from 'react'

interface ContextProps {
  activeOption: string
  setActiveOption: React.Dispatch<React.SetStateAction<string>>
  activeCategory: string
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>
}

const IngredientsContext = createContext<ContextProps | undefined>(undefined)

interface ProviderProps {
  children: ReactNode | Array<ReactNode>
}

export const IngredientsProvider: FC<ProviderProps> = ({ children }) => {
  const [activeOption, setActiveOption] = useState('includes')
  const [activeCategory, setActiveCategory] = useState('all')

  const value = useMemo(
    () => ({ activeOption, setActiveOption, activeCategory, setActiveCategory }),
    [activeOption, activeCategory],
  )

  return <IngredientsContext.Provider value={value}>{children}</IngredientsContext.Provider>
}

export const useIngredientsContext = () => {
  const context = useContext(IngredientsContext)

  if (context === undefined) {
    throw new Error('useIngredientsContext must be used within a IngredientsProvider')
  }

  return context
}
