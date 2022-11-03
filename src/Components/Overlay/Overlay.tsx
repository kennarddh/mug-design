import { FC, useState, useRef } from 'react'

import { useDrop } from 'react-dnd'

import BaseBlock from 'Components/BaseBlock/BaseBlock'
import ItemTypes from 'Constants/ItemTypes'
import { MergeRef } from 'Utils/MergeRef'

import { IPosition, IItem } from 'Types'
import { OuterContainer, Container } from './Styles'

const Overlay: FC = () => {
	const [Position, SetPosition] = useState<IPosition>({ x: 0, y: 0 })

	const OverlayRef = useRef<HTMLDivElement>(null)

	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.Image,
			drop: (item: IItem, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset()

				const deltaX = delta?.x ?? 0
				const deltaY = delta?.y ?? 0

				const containerX =
					OverlayRef.current?.getBoundingClientRect().width ?? 0

				const containerY =
					OverlayRef.current?.getBoundingClientRect().height ?? 0

				let newX = deltaX + Position.x
				let newY = deltaY + Position.y

				if (newX + item.width > containerX)
					newX = containerX - item.width
				else if (newX < 0) newX = 0

				if (newY + item.height > containerY)
					newY = containerY - item.height
				else if (newY < 0) newY = 0

				SetPosition({
					x: newX,
					y: newY,
				})
			},
		}),
		[OverlayRef, Position.x, Position.y]
	)

	return (
		<OuterContainer ref={MergeRef(drop, OverlayRef)}>
			<Container>
				<BaseBlock type='Image' position={Position} />
			</Container>
		</OuterContainer>
	)
}

export default Overlay
