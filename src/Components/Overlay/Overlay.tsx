import { FC, useState, useRef } from 'react'

import { useDrop, XYCoord } from 'react-dnd'

import BaseBlock from 'Components/BaseBlock/BaseBlock'
import ItemTypes from 'Constants/ItemTypes'
import { MergeRef } from 'Utils/MergeRef'

import { IItem } from 'Types'
import { OuterContainer, Container } from './Styles'

const Overlay: FC = () => {
	const [Position, SetPosition] = useState<XYCoord>({ x: 0, y: 0 })

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

				const positionX = (Position.x / 100) * containerX
				const positionY = (Position.y / 100) * containerY

				let newX = deltaX + positionX
				let newY = deltaY + positionY

				if (newX + item.width > containerX)
					newX = containerX - item.width
				else if (newX < 0) newX = 0

				if (newY + item.height > containerY)
					newY = containerY - item.height
				else if (newY < 0) newY = 0

				const percentageX = (newX / containerX) * 100
				const percentageY = (newY / containerY) * 100

				SetPosition({
					x: percentageX,
					y: percentageY,
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
