// Validator for Canadian PHNs (Personal Health Numbers)
// http://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/app_d.pdf

const DIGIT_WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3]

export const validPhn = (phn) => {
  const phnInt = parseInt(phn)

  // PHN must be an integer or it ain't valid
  if (isNaN(phnInt)) { return false }

  // Split PHN into array of integer
  const phnDigits = Array.from(phnInt.toString()).map(Number)

  // Shift & pop first and last digits
  const firstDigit = phnDigits.shift()
  const lastDigit = phnDigits.pop()

  // PHN must start with 9 or it ain't valid
  if (firstDigit !== 9) { return false }

  // Multiply each digit by the specified digit weight, divide each by
  // 11, and grab the remainder. Finally, add all of the digits up, divide
  // by 11 and grab the total remainder
  const digitRemainderTotal = phnDigits
    .map((digit, i) => (digit * DIGIT_WEIGHTS[i]) % 11)
    .reduce((m, i) => m + i) % 11

  // Total remainder subtracted from 11 must equal last digit to be valid
  return (11 - digitRemainderTotal) === lastDigit
}
