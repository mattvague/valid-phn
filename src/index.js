const weights = [2, 4, 8, 5, 10, 9, 7, 3]

export const validPhn = (phn) => {
  const phnInt = parseInt(phn)

  if (isNaN(phnInt)) { return false }

  const phnDigits = Array.from(phnInt.toString()).map(Number)
  const firstDigit = phnDigits.shift()
  const lastDigit = phnDigits.pop()

  if (firstDigit !== 9) { return false }

  const digitRemainderTotal = phnDigits
    .map((digit, i) => (digit * weights[i]) % 11)
    .reduce((m, i) => m + i) % 11

  return (11 - digitRemainderTotal) === lastDigit
}
