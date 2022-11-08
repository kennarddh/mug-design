import { FC, useRef, useContext } from 'react'

import { useDrop } from 'react-dnd'

import BlocksContext from 'Contexts/Blocks/Blocks'

import BaseBlock from 'Components/BaseBlock/BaseBlock'
import ItemTypes from 'Constants/ItemTypes'

import { MergeRef } from 'Utils/MergeRef'

import { ISize, IItem } from 'Types'

import { OuterContainer, Container } from './Styles'

const Overlay: FC = () => {
	const { Blocks, SetBlockPosition, SetBlockSize } = useContext(BlocksContext)

	const OverlayRef = useRef<HTMLDivElement>(null)

	const [, drop] = useDrop<IItem>(
		() => ({
			accept: ItemTypes.Image,
			drop: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset()

				const deltaX = delta?.x ?? 0
				const deltaY = delta?.y ?? 0

				const containerX =
					OverlayRef.current?.getBoundingClientRect().width ?? 0

				const containerY =
					OverlayRef.current?.getBoundingClientRect().height ?? 0

				const positionX =
					(Blocks[item.id].position.x / 100) * containerX
				const positionY =
					(Blocks[item.id].position.y / 100) * containerY

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

				SetBlockPosition(item.id, {
					x: percentageX,
					y: percentageY,
				})
			},
		}),
		[OverlayRef, Blocks]
	)

	const [, resizeDrop] = useDrop<ISize & { id: string }>(() => ({
		accept: ItemTypes.ResizeHandle,
		hover: (item, monitor) => {
			const delta = monitor.getDifferenceFromInitialOffset()

			const deltaX = delta?.x ?? 0
			const deltaY = delta?.y ?? 0

			SetBlockSize(item.id, {
				width: item.width + deltaX,
				height: item.height + deltaY,
			})
		},
	}))

	return (
		<OuterContainer ref={MergeRef(drop, OverlayRef, resizeDrop)}>
			<Container>
				{Object.entries(Blocks).map(([id]) => (
					<BaseBlock key={id} type='Image' id={id} />
				))}
			</Container>
		</OuterContainer>
	)
}

export default Overlay
