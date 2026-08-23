import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fallback avatar initials for users without a profile image (e.g. email/password
// signups — Google logins get `image` set automatically by Better Auth).
export function getInitials(name?: string | null) {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  const initials =
    parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : parts[0].slice(0, 2)
  return initials.toUpperCase()
}
