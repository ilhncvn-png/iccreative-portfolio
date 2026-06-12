import { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)

  const openModal      = () => setIsOpen(true)
  const closeModal     = () => setIsOpen(false)
  const openCaseStudy  = (project) => setActiveCaseStudy(project)
  const closeCaseStudy = () => setActiveCaseStudy(null)

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, activeCaseStudy, openCaseStudy, closeCaseStudy }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
