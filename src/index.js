// Validator for British Columbia PHNs (Personal Health Numbers)
// http://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/app_d.pdf

const DIGIT_WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3]

export const validPhn = (phn) => {
  const phnInt = parseInt(phn)

  // PHN must be an integer or it ain't valid
  if (isNaN(phnInt)) { return false }

  // Split PHN into array of integers
  const phnDigits = Array.from(phnInt.toString()).map(Number)

  // Shift & pop first and last digits
  const firstDigit = phnDigits.shift()
  const lastDigit = phnDigits.pop()

  // PHN must start with 9 or it ain't valid
  if (firstDigit !== 9) { return false }

  // Multiply each digit by specified weight, divide by 11,
  // sum remainders, divide by 11 and grab total remainder
  const digitRemainderTotal = phnDigits
    .reduce((total, digit, i) => total + ((digit * DIGIT_WEIGHTS[i]) % 11), 0) % 11

  // Total remainder subtracted from 11 must equal last digit to be valid
  return (11 - digitRemainderTotal) === lastDigit
}
