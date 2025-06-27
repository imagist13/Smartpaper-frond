import { useState, useEffect } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000 // 5 seconds auto-dismiss

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

// Determine toast variant based on type
function getVariantFromType(type) {
  switch (type) {
    case 'success':
      return 'success'
    case 'error':
      return 'destructive'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'default'
  }
}

// Exported toast function that can be imported directly
export function toast({ ...props }) {
  const id = genId()
  const variant = props.variant || getVariantFromType(props.type)

  if (toastState.setToasts) {
    toastState.setToasts((toasts) => {
      const newToasts = [
        {
          ...props,
          id,
          variant,
          open: true,
        },
        ...toasts,
      ].slice(0, TOAST_LIMIT)

      return newToasts
    })
  }

  // Auto-dismiss after specified time
  if (props.duration !== Infinity) {
    setTimeout(() => {
      dismiss(id)
    }, props.duration || TOAST_REMOVE_DELAY)
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

      setTimeout(() => remove(toastId), 300) // Shorter animation duration
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