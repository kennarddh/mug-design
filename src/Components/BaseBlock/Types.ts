import ItemTypes from 'Constants/ItemTypes'
import type { ISize } from 'Types'

import { XYCoord } from 'react-dnd'

export interface Props {
	type: keyof typeof ItemTypes
	id: string
}

export interface ContainerProps
	extends XYCoord,
		Omit<ISize, 'lockAspectRatio'> {
	isDragging: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InnerProps extends Omit<ISize, 'lockAspectRatio'> {}
