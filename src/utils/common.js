export const formatCurrency = (value) => {
  const intValue = Math.floor(value)
  const formattedValue = intValue.toLocaleString()
  return formattedValue
}