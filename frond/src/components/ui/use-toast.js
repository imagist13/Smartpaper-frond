import { useState, useEffect } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map()

export function useToast() {
  const [toasts, setToasts] = useState([])

  const dismiss = (toastId) => {
    setToasts((toasts) =>
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

  const remove = (toastId) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId))
  }

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

  function toast({ ...props }) {
    const id = genId()

    setToasts((toasts) => {
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

    return {
      id,
      dismiss: () => dismiss(id),
      remove: () => remove(id),
    }
  }

  return {
    toast,
    toasts,
    dismiss,
    remove,
  }
} 