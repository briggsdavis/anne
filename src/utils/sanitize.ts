import DOMPurify from 'dompurify'

// Configure DOMPurify with secure settings
const configurePurify = () => {
  // Only allow safe HTML tags for basic formatting
  const allowedTags = ['b', 'i', 'em', 'strong', 'p', 'br']
  const allowedAttributes: string[] = []

  return {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
    FORBID_SCRIPT: true,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'link', 'style'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  }
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param input - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // Server-side: strip all HTML tags
    return input.replace(/<[^>]*>/g, '')
  }
  
  return DOMPurify.sanitize(input, configurePurify())
}

/**
 * Sanitize plain text input to prevent XSS
 * @param input - The text string to sanitize
 * @returns Sanitized text string
 */
export const sanitizeText = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Sanitize search query input
 * @param query - The search query to sanitize
 * @returns Sanitized search query
 */
export const sanitizeSearchQuery = (query: string): string => {
  if (typeof query !== 'string') return ''
  
  // Remove potentially dangerous characters but keep search functionality
  return query
    .replace(/[<>"/\\]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .trim()
    .slice(0, 100) // Limit length
}

/**
 * Sanitize file name for upload
 * @param fileName - The file name to sanitize
 * @returns Sanitized file name
 */
export const sanitizeFileName = (fileName: string): string => {
  if (typeof fileName !== 'string') return ''
  
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace special chars with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .slice(0, 100) // Limit length
}

/**
 * Validate and sanitize email
 * @param email - The email to validate and sanitize
 * @returns Sanitized email or empty string if invalid
 */
export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') return ''
  
  const sanitized = email.toLowerCase().trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  return emailRegex.test(sanitized) ? sanitized : ''
}

/**
 * Sanitize and validate jewelry form data
 * @param data - Form data object to sanitize
 * @returns Sanitized form data
 */
export const sanitizeJewelryFormData = (data: Record<string, unknown>) => {
  return {
    ...data,
    title: sanitizeText(String(data.title || '')).slice(0, 200),
    description: sanitizeHtml(String(data.description || '')).slice(0, 2000),
    admin_notes: sanitizeText(String(data.admin_notes || '')).slice(0, 1000),
    materials: Array.isArray(data.materials) 
      ? data.materials.map((m: string) => sanitizeText(m).slice(0, 100)).filter(Boolean)
      : [],
    category: sanitizeText(String(data.category || '')),
    gender: data.gender ? sanitizeText(String(data.gender)) : undefined,
    available_sizes: Array.isArray(data.available_sizes)
      ? data.available_sizes.map((size: number) => sanitizeRingSize(size)).filter(size => size !== null)
      : undefined,
  }
}

/**
 * Sanitize and validate ring size
 * @param size - Ring size to validate
 * @returns Valid ring size or null if invalid
 */
export const sanitizeRingSize = (size: number): number | null => {
  if (typeof size !== 'number' || isNaN(size)) {
    return null
  }
  
  // Valid US ring sizes from 3 to 13 with half sizes
  const validSizes = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13]
  
  return validSizes.includes(size) ? size : null
}