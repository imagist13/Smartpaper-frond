import { useState, useEffect } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map()

// Create a singleton toast function that can be imported directly
const toastState = {
  toasts: [],
  setToasts: null,
}

function dismiss(toastId) {
  if (toastState.setToasts) {
    toastState.setToasts((toasts) =>
      toasts.map((toast) =>
        toast.id === toastId
          ? {
              ...toast,
              open: false,
            }
          : toast
      )
    )
  }
}

function remove(toastId) {
  if (toastState.setToasts) {
    toastState.setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId))
  }
}

// Exported toast function that can be imported directly
export function toast({ ...props }) {
  const id = genId()

  if (toastState.setToasts) {
    toastState.setToasts((toasts) => {
      const newToasts = [
        {
          ...props,
          id,
          open: true,
        },
        ...toasts,
      ].slice(0, TOAST_LIMIT)

      return newToasts
    })
  }

  return {
    id,
    dismiss: () => dismiss(id),
    remove: () => remove(id),
  }
}

export function useToast() {
  const [toasts, setToasts] = useState([])

  // Initialize the singleton state
  useEffect(() => {
    toastState.setToasts = setToasts
    return () => {
      toastState.setToasts = null
    }
  }, [setToasts])

  useEffect(() => {
    toastState.toasts = toasts
  }, [toasts])

  useEffect(() => {
    const handleRemove = (toastId) => {
      if (toastTimeouts.has(toastId)) {
        clearTimeout(toastTimeouts.get(toastId))
        toastTimeouts.delete(toastId)
      }

      setTimeout(() => remove(toastId), TOAST_REMOVE_DELAY)
    }

    toasts
      .filter((toast) => !toast.open)
      .forEach((toast) => {
        handleRemove(toast.id)
      })
  }, [toasts])

  return {
    toast,
    toasts,
    dismiss,
    remove,
  }
} 