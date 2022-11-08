import { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import ItemTypes from 'Constants/ItemTypes'

import { MergeRef } from 'Utils/MergeRef'

import { Handle, Handles } from './Styles'

import type { Props } from './Types'
import { ISize } from 'Types'

const ResizeHandle: FC<Props> = ({ setSize, size }) => {
	const [, drag] = useDrag(
		() => ({
			type: ItemTypes.ResizeHandle,
			item: { width: size.width, height: size.height },
		}),
		[size.height, size.width]
	)

	const [, drop] = useDrop<ISize>(() => ({
		accept: ItemTypes.ResizeHandle,
		hover: (item, monitor) => {
			const delta = monitor.getDifferenceFromInitialOffset()

			const deltaX = delta?.x ?? 0
			const deltaY = delta?.y ?? 0

			setSize({
				width: item.width + deltaX,
				height: item.height + deltaY,
			})
		},
	}))

	return (
		<Handles>
			<Handle ref={MergeRef(drop, drag)} />
		</Handles>
	)
}

export default ResizeHandle
