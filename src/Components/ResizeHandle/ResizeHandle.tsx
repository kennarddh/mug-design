/* eslint-disable security/detect-object-injection */
import { FC, useContext } from 'react'

import { useDrag, useDrop } from 'react-dnd'

import ItemTypes from 'Constants/ItemTypes'

import { MergeRef } from 'Utils/MergeRef'

import BlocksContext from 'Contexts/Blocks/Blocks'

import { ISize } from 'Types'

import { Handle, Handles } from './Styles'

import type { Props } from './Types'

const ResizeHandle: FC<Props> = ({ id }) => {
	const { Blocks, SetBlockSize } = useContext(BlocksContext)

	const [, drag] = useDrag(
		() => ({
			type: ItemTypes.ResizeHandle,
			item: {
				width: Blocks[id].size.width,
				height: Blocks[id].size.height,
			},
		}),
		[Blocks[id].size.width, Blocks[id].size.height]
	)

	const [, drop] = useDrop<ISize>(() => ({
		accept: ItemTypes.ResizeHandle,
		hover: (item, monitor) => {
			const delta = monitor.getDifferenceFromInitialOffset()

			const deltaX = delta?.x ?? 0
			const deltaY = delta?.y ?? 0

			SetBlockSize(id, {
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
