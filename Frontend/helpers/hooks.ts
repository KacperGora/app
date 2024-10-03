import { useState } from 'react'

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleModal = () => {
    setIsVisible((prev) => !prev)
  }
  return [isVisible, toggleModal] as const
}
