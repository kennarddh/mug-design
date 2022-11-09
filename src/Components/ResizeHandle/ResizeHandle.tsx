import { FC, useContext, useEffect } from 'react'

import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import ItemTypes from 'Constants/ItemTypes'

import BlocksContext from 'Contexts/Blocks/Blocks'

import { Handle, Handles } from './Styles'

import type { Props } from './Types'

const ResizeHandle: FC<Props> = ({ id }) => {
	const { Blocks } = useContext(BlocksContext)

	const [, drag, preview] = useDrag(
		() => ({
			type: ItemTypes.ResizeHandle,
			item: {
				width: Blocks[id].size.width,
				height: Blocks[id].size.height,
				id,
			},
			options: {
				dropEffect: 'copy',
			},
		}),
		[Blocks[id].size.width, Blocks[id].size.height]
	)

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true })
	}, [preview])

	return (
		<Handles>
			<Handle ref={drag} />
		</Handles>
	)
}

export default ResizeHandle
