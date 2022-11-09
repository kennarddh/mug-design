export const DecimalToPercentage = (value: number, divisor: number): number => {
	return (value / divisor) * 100
}

export const PercentageToDecimal = (value: number, divisor: number): number => {
	return (value / 100) * divisor
}
