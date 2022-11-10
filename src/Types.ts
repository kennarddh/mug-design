import type { Dispatch, SetStateAction } from 'react'

export interface ISize {
	width: number
	height: number
	lockAspectRatio: boolean
}

export type ReactSetState<T> = Dispatch<SetStateAction<T> | T>
