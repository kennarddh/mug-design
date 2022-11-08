export type ICallback<T, Y> = (...data: Y[]) => T

const ValueOrCallback = <T, Y>(
	valueOrCallback: T | ICallback<T, Y>,
	callbackValue: Y[]
) => {
	if (typeof valueOrCallback === 'function') {
		const callback = valueOrCallback as ICallback<T, Y>

		return callback(...callbackValue)
	} else {
		return valueOrCallback as T
	}
}

export default ValueOrCallback
