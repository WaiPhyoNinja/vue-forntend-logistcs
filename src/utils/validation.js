/**
 * Form Validation and Sanitization Utilities
 * Provides comprehensive validation and security measures for form inputs
 */

// Regular expressions for validation
// Supports Latin, Accented characters, Burmese/Myanmar, Thai, Khmer, Lao
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s()+-]{7,20}$/, // Allows digits, spaces, parentheses, plus, minus
  postalCode: /^[a-zA-Z0-9\s-]{3,20}$/,
  // Unicode ranges: Basic Latin (a-z, A-Z), Latin Extended (À-ÿ), Burmese (\u1000-\u109F), Thai (\u0E00-\u0E7F)
  firstName: /^[a-zA-ZÀ-ÿ\u1000-\u109F\u0E00-\u0E7F\s'-]{1,50}$/,
  lastName: /^[a-zA-ZÀ-ÿ\u1000-\u109F\u0E00-\u0E7F\s'-]{1,50}$/,
  city: /^[a-zA-ZÀ-ÿ\u1000-\u109F\u0E00-\u0E7F\s'-]{1,50}$/,
  state: /^[a-zA-ZÀ-ÿ\u1000-\u109F\u0E00-\u0E7F\s'-]{1,50}$/,
  address: /^[a-zA-Z0-9À-ÿ\u1000-\u109F\u0E00-\u0E7F\s,.'#-]{5,200}$/,
  company: /^[a-zA-Z0-9À-ÿ\u1000-\u109F\u0E00-\u0E7F\s,.'&#()-]{1,100}$/,
  country: /^[a-zA-ZÀ-ÿ\u1000-\u109F\u0E00-\u0E7F\s'-]{2,100}$/,
  number: /^[0-9]+(\.[0-9]{1,2})?$/,
  description: /^[a-zA-Z0-9À-ÿ\u1000-\u109F\u0E00-\u0E7F\s.,!?'-]{5,500}$/,
}

// Input length restrictions
const LENGTH_LIMITS = {
  firstName: { min: 1, max: 50 },
  lastName: { min: 1, max: 50 },
  company: { min: 0, max: 100 },
  email: { min: 5, max: 100 },
  phone: { min: 7, max: 20 },
  address: { min: 5, max: 200 },
  city: { min: 1, max: 50 },
  state: { min: 1, max: 50 },
  country: { min: 2, max: 100 },
  postalCode: { min: 3, max: 20 },
  description: { min: 5, max: 500 },
  specialInstructions: { min: 0, max: 500 },
}

/**
 * Sanitize input string by removing potentially harmful characters
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return ''
  }

  return input
    .trim()
    // Remove leading/trailing whitespace
    .replace(/^\s+|\s+$/g, '')
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove on* event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove data: protocol (for xss attacks)
    .replace(/data:text\/html/gi, '')
    // Basic HTML escape
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Escape HTML special characters for safe display
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
export function escapeHtml(text) {
  if (typeof text !== 'string') {
    return ''
  }

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'\/]/g, (char) => map[char])
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export function validateEmail(email) {
  const sanitized = sanitizeInput(email)

  if (!sanitized || sanitized.length < 5 || sanitized.length > 100) {
    return false
  }

  // Check pattern
  if (!PATTERNS.email.test(sanitized)) {
    return false
  }

  // Check for multiple @ symbols
  if ((sanitized.match(/@/g) || []).length !== 1) {
    return false
  }

  // Check for valid domain
  const parts = sanitized.split('@')
  const domain = parts[1]
  if (!domain || domain.length < 3 || !domain.includes('.')) {
    return false
  }

  return true
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export function validatePhone(phone) {
  const sanitized = sanitizeInput(phone)

  if (!sanitized || sanitized.length < 7 || sanitized.length > 20) {
    return false
  }

  // Remove common separators to count digits
  const digitsOnly = sanitized.replace(/[\s()+-]/g, '')

  // Must have at least 7 digits
  if (digitsOnly.length < 7) {
    return false
  }

  // Check pattern
  return PATTERNS.phone.test(sanitized)
}

/**
 * Validate text field (names, cities, etc.)
 * @param {string} value - Value to validate
 * @param {string} fieldType - Type of field (firstName, lastName, city, etc.)
 * @returns {boolean} - True if valid
 */
export function validateTextField(value, fieldType) {
  const sanitized = sanitizeInput(value)
  const limits = LENGTH_LIMITS[fieldType]

  if (!limits) {
    return false
  }

  // Check length
  if (sanitized.length < limits.min || sanitized.length > limits.max) {
    return false
  }

  // Check pattern if it exists
  const pattern = PATTERNS[fieldType]
  if (pattern && !pattern.test(sanitized)) {
    return false
  }

  return true
}

/**
 * Validate address field
 * @param {string} address - Address to validate
 * @returns {boolean} - True if valid
 */
export function validateAddress(address) {
  const sanitized = sanitizeInput(address)
  const limits = LENGTH_LIMITS.address

  if (!sanitized || sanitized.length < limits.min || sanitized.length > limits.max) {
    return false
  }

  return PATTERNS.address.test(sanitized)
}

/**
 * Validate postal code
 * @param {string} postalCode - Postal code to validate
 * @returns {boolean} - True if valid (optional field)
 */
export function validatePostalCode(postalCode) {
  // Postal code is optional
  if (!postalCode) {
    return true
  }

  const sanitized = sanitizeInput(postalCode)
  const limits = LENGTH_LIMITS.postalCode

  if (sanitized.length < limits.min || sanitized.length > limits.max) {
    return false
  }

  return PATTERNS.postalCode.test(sanitized)
}

/**
 * Validate numeric field (weight, dimensions, etc.)
 * @param {string|number} value - Value to validate
 * @param {number} minValue - Minimum value allowed
 * @param {number} maxValue - Maximum value allowed (optional)
 * @returns {boolean} - True if valid
 */
export function validateNumeric(value, minValue = 0, maxValue = null) {
  if (value === '' || value === null || value === undefined) {
    return true // Optional field
  }

  const num = parseFloat(value)

  if (isNaN(num)) {
    return false
  }

  if (num < minValue) {
    return false
  }

  if (maxValue !== null && num > maxValue) {
    return false
  }

  return true
}

/**
 * Validate textarea field (description, special instructions)
 * @param {string} text - Text to validate
 * @param {string} fieldType - Type of field
 * @returns {boolean} - True if valid
 */
export function validateTextarea(text, fieldType) {
  const sanitized = sanitizeInput(text)
  const limits = LENGTH_LIMITS[fieldType]

  if (!limits) {
    return false
  }

  // Check length
  if (sanitized.length < limits.min || sanitized.length > limits.max) {
    return false
  }

  return true
}

/**
 * Validate entire form step
 * @param {object} data - Form data object
 * @param {number} step - Current step (1, 2, or 3)
 * @returns {object} - { isValid: boolean, errors: object }
 */
export function validateFormStep(data, step) {
  const errors = {}

  if (step === 1) {
    // Validate sender information
    const sender = data.sender

    if (!validateTextField(sender.firstName, 'firstName')) {
      errors.firstName = 'Invalid first name'
    }

    if (!validateTextField(sender.lastName, 'lastName')) {
      errors.lastName = 'Invalid last name'
    }

    if (sender.company && !validateTextField(sender.company, 'company')) {
      errors.company = 'Invalid company name'
    }

    if (!validateEmail(sender.email)) {
      errors.email = 'Invalid email address'
    }

    if (!validatePhone(sender.phone)) {
      errors.phone = 'Invalid phone number'
    }

    if (!validateAddress(sender.address)) {
      errors.address = 'Invalid address'
    }

    if (!validateTextField(sender.city, 'city')) {
      errors.city = 'Invalid city'
    }

    if (!validateTextField(sender.state, 'state')) {
      errors.state = 'Invalid state'
    }

    if (!sanitizeInput(sender.country)) {
      errors.country = 'Please select a country'
    }

    if (!validatePostalCode(sender.postalCode)) {
      errors.postalCode = 'Invalid postal code'
    }
  } else if (step === 2) {
    // Validate receiver information (same as sender)
    const receiver = data.receiver

    if (!validateTextField(receiver.firstName, 'firstName')) {
      errors.firstName = 'Invalid first name'
    }

    if (!validateTextField(receiver.lastName, 'lastName')) {
      errors.lastName = 'Invalid last name'
    }

    if (receiver.company && !validateTextField(receiver.company, 'company')) {
      errors.company = 'Invalid company name'
    }

    if (!validateEmail(receiver.email)) {
      errors.email = 'Invalid email address'
    }

    if (!validatePhone(receiver.phone)) {
      errors.phone = 'Invalid phone number'
    }

    if (!validateAddress(receiver.address)) {
      errors.address = 'Invalid address'
    }

    if (!validateTextField(receiver.city, 'city')) {
      errors.city = 'Invalid city'
    }

    if (!validateTextField(receiver.state, 'state')) {
      errors.state = 'Invalid state'
    }

    if (!sanitizeInput(receiver.country)) {
      errors.country = 'Please select a country'
    }

    if (!validatePostalCode(receiver.postalCode)) {
      errors.postalCode = 'Invalid postal code'
    }
  } else if (step === 3) {
    // Validate shipment details
    const shipment = data.shipment

    if (!sanitizeInput(shipment.type)) {
      errors.type = 'Please select shipment type'
    }

    if (!sanitizeInput(shipment.service)) {
      errors.service = 'Please select service type'
    }

    if (!validateNumeric(shipment.weight, 0.01, 1000)) {
      errors.weight = 'Invalid weight'
    }

    if (!validateNumeric(shipment.length, 0, 500)) {
      errors.length = 'Invalid length'
    }

    if (!validateNumeric(shipment.width, 0, 500)) {
      errors.width = 'Invalid width'
    }

    if (!validateNumeric(shipment.height, 0, 500)) {
      errors.height = 'Invalid height'
    }

    if (!validateNumeric(shipment.quantity, 1, 10000)) {
      errors.quantity = 'Invalid quantity'
    }

    if (!validateNumeric(shipment.declaredValue, 0, 999999)) {
      errors.declaredValue = 'Invalid declared value'
    }

    if (!validateTextarea(shipment.description, 'description')) {
      errors.description = 'Please describe the package (5-500 characters)'
    }

    if (shipment.specialInstructions && !validateTextarea(shipment.specialInstructions, 'specialInstructions')) {
      errors.specialInstructions = 'Invalid special instructions'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Sanitize entire form data object
 * @param {object} formData - Form data to sanitize
 * @returns {object} - Sanitized form data
 */
export function sanitizeFormData(formData) {
  return {
    sender: {
      firstName: sanitizeInput(formData.sender.firstName),
      lastName: sanitizeInput(formData.sender.lastName),
      company: sanitizeInput(formData.sender.company),
      email: sanitizeInput(formData.sender.email),
      phone: sanitizeInput(formData.sender.phone),
      address: sanitizeInput(formData.sender.address),
      city: sanitizeInput(formData.sender.city),
      state: sanitizeInput(formData.sender.state),
      country: sanitizeInput(formData.sender.country),
      postalCode: sanitizeInput(formData.sender.postalCode),
    },
    receiver: {
      firstName: sanitizeInput(formData.receiver.firstName),
      lastName: sanitizeInput(formData.receiver.lastName),
      company: sanitizeInput(formData.receiver.company),
      email: sanitizeInput(formData.receiver.email),
      phone: sanitizeInput(formData.receiver.phone),
      address: sanitizeInput(formData.receiver.address),
      city: sanitizeInput(formData.receiver.city),
      state: sanitizeInput(formData.receiver.state),
      country: sanitizeInput(formData.receiver.country),
      postalCode: sanitizeInput(formData.receiver.postalCode),
    },
    shipment: {
      type: sanitizeInput(formData.shipment.type),
      service: sanitizeInput(formData.shipment.service),
      weight: formData.shipment.weight ? parseFloat(formData.shipment.weight) : '',
      length: formData.shipment.length ? parseFloat(formData.shipment.length) : '',
      width: formData.shipment.width ? parseFloat(formData.shipment.width) : '',
      height: formData.shipment.height ? parseFloat(formData.shipment.height) : '',
      quantity: formData.shipment.quantity ? parseInt(formData.shipment.quantity) : 1,
      declaredValue: formData.shipment.declaredValue ? parseFloat(formData.shipment.declaredValue) : '',
      description: sanitizeInput(formData.shipment.description),
      specialInstructions: sanitizeInput(formData.shipment.specialInstructions),
      insurance: Boolean(formData.shipment.insurance),
    },
  }
}

/**
 * Check for CSRF token in meta tag
 * @returns {string|null} - CSRF token or null
 */
export function getCsrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]')
  return meta ? meta.getAttribute('content') : null
}

/**
 * Create timing-safe submission handler with rate limiting
 * @returns {object} - { canSubmit: function, getRemainingTime: function }
 */
export function createSubmissionRateLimiter(delayMs = 1000) {
  let lastSubmission = 0

  return {
    canSubmit() {
      const now = Date.now()
      if (now - lastSubmission < delayMs) {
        return false
      }
      lastSubmission = now
      return true
    },
    getRemainingTime() {
      const now = Date.now()
      const elapsed = now - lastSubmission
      const remaining = Math.max(0, delayMs - elapsed)
      return remaining
    },
  }
}

/**
 * Validate entire quote request before submission
 * @param {object} formData - Complete form data
 * @returns {object} - { isValid: boolean, errors: object }
 */
export function validateCompleteForm(formData) {
  let allErrors = {}

  // Validate all 3 steps
  for (let step = 1; step <= 3; step++) {
    const stepValidation = validateFormStep(formData, step)
    if (!stepValidation.isValid) {
      allErrors = { ...allErrors, ...stepValidation.errors }
    }
  }

  return {
    isValid: Object.keys(allErrors).length === 0,
    errors: allErrors,
  }
}

export default {
  sanitizeInput,
  escapeHtml,
  validateEmail,
  validatePhone,
  validateTextField,
  validateAddress,
  validatePostalCode,
  validateNumeric,
  validateTextarea,
  validateFormStep,
  sanitizeFormData,
  getCsrfToken,
  createSubmissionRateLimiter,
  validateCompleteForm,
}
