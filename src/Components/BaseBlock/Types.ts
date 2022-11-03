import ItemTypes from 'Constants/ItemTypes'
import type { IPosition, ISize } from 'Types'

export interface Props {
	type: keyof typeof ItemTypes
	position: IPosition
}

export interface ContainerProps extends IPosition, ISize {
	isDragging: boolean
}
