import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPercentage(value) {
  return `${(value * 100).toFixed(1)}%`
}

export function formatMetric(value, decimals = 4) {
  return value?.toFixed(decimals) ?? 'N/A'
}
