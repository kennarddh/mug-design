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

				let deltaX = delta?.x ?? 0
				let deltaY = delta?.y ?? 0

				const containerX =
					OverlayRef.current?.getBoundingClientRect().width ?? 0

				const containerY =
					OverlayRef.current?.getBoundingClientRect().height ?? 0

				if (deltaX + Position.x + item.width > containerX)
					deltaX = containerX - Position.x - item.width

				if (deltaY + Position.y + item.height > containerY)
					deltaY = containerY - Position.y - item.height

				SetPosition(prev => ({
					x: prev.x + deltaX,
					y: prev.y + deltaY,
				}))
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
