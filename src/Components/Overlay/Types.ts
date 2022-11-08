export interface Props {
	width: number
	height: number
}

export type IOuterContainerProps = Pick<Props, 'width' | 'height'>
