import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

/**
 * Converts a date to ISO format (YYYY-MM-DD) considering UTC.
 * We use UTC to ensure consistency in date storage,
 * especially important when working with APIs and databases.
 *
 * @param date Date to convert
 * @returns A string in YYYY-MM-DD format
 *
 * @example
 * const date = new Date()
 * toISODateString(date) // Returns: "2024-12-21"
 */
export function toISODateString(date: Date): string {
  // Convert date to UTC timezone
  // toZonedTime gives us a Date object adjusted to the specified timezone
  const utcDate = toZonedTime(date, 'UTC')

  // Format the date using ISO date format
  return format(utcDate, 'yyyy-MM-dd')
}

/**
 * Converts a date to ISO datetime format (YYYY-MM-DDTHH:mm:ssZ) in UTC.
 * This format is especially useful for DateTimeField in APIs,
 * as it includes both date and time with second precision.
 *
 * @param date Date to convert
 * @returns A string in YYYY-MM-DDTHH:mm:ssZ format
 *
 * @example
 * const date = new Date()
 * toISODateTimeString(date) // Returns: "2024-12-21T15:30:00Z"
 */
export function toISODateTimeString(date: Date): string {
  const utcDate = toZonedTime(date, 'UTC')
  return format(utcDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
}
