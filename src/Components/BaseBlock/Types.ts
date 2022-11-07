import ItemTypes from 'Constants/ItemTypes'
import type { ISize } from 'Types'

import { XYCoord } from 'react-dnd'

export interface Props {
	type: keyof typeof ItemTypes
	position: XYCoord
}

export interface ContainerProps extends XYCoord, ISize {
	isDragging: boolean
}
