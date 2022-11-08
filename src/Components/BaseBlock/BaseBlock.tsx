import { FC, useState } from 'react'

import { useDrag } from 'react-dnd'

import ResizeHandle from 'Components/ResizeHandle/ResizeHandle'

import { Container } from './Styles'

import type { Props } from './Types'
import type { ISize } from 'Types'

const Overlay: FC<Props> = ({ type, position }) => {
	const [Size, SetSize] = useState<ISize>({ width: 50, height: 50 })

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: type,
			item: { width: Size.width, height: Size.height },
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[Size.width, Size.height]
	)

	if (isDragging) return null

	return (
		<Container
			ref={drag}
			isDragging={isDragging}
			x={position.x}
			y={position.y}
			width={Size.width}
			height={Size.height}
		>
			<ResizeHandle setSize={SetSize} size={Size} />
		</Container>
	)
}

export default Overlay
