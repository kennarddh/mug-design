import { FC, useContext } from 'react'

import { useDrag } from 'react-dnd'

import BlocksContext from 'Contexts/Blocks/Blocks'

import ResizeHandle from 'Components/ResizeHandle/ResizeHandle'

import { Container } from './Styles'

import type { Props } from './Types'

const BaseBlock: FC<Props> = ({ type, id }) => {
	const { Blocks, SetSelectedBlockId } = useContext(BlocksContext)

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: type,
			item: () => {
				Select()

				return {
					width: Blocks[id].size.width,
					height: Blocks[id].size.height,
					id,
				}
			},
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[Blocks[id].size.width, Blocks[id].size.height]
	)

	const Select = () => {
		SetSelectedBlockId(id)
	}

	if (isDragging) return null

	return (
		<Container
			onClick={Select}
			ref={drag}
			isDragging={isDragging}
			x={Blocks[id].position.x}
			y={Blocks[id].position.y}
			width={Blocks[id].size.width}
			height={Blocks[id].size.height}
		>
			<ResizeHandle id={id} />
		</Container>
	)
}

export default BaseBlock
