import type { Dispatch, SetStateAction } from 'react'

export interface ISize {
	width: number
	height: number
}

export type ReactSetState<T> = Dispatch<SetStateAction<T> | T>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IItem extends ISize {}
