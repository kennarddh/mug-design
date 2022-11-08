import ItemTypes from 'Constants/ItemTypes'
import type { ISize } from 'Types'

import { XYCoord } from 'react-dnd'

export interface Props {
	type: keyof typeof ItemTypes
	id: string
}

export interface ContainerProps extends XYCoord, ISize {
	isDragging: boolean
}
