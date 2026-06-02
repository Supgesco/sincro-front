"use client"

import { ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  hideClose?: boolean
  className?: string
}

export function Modal({ isOpen, onClose, children, hideClose = false, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative z-10 rounded-2xl shadow-2xl ${
        "bg-sincro-modal-bg"
      } ${className || "max-w-6xl mx-4 max-h-[90vh] overflow-y-auto"}`}>
        {!hideClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10 text-sincro-modal-text"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
