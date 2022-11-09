import { FC, useContext } from 'react'

import { useDrop } from 'react-dnd'

import BlocksContext from 'Contexts/Blocks/Blocks'

import BaseBlock from 'Components/BaseBlock/BaseBlock'
import ItemTypes from 'Constants/ItemTypes'

import { MergeRef } from 'Utils/MergeRef'

import { ISize, IItem } from 'Types'

import { OuterContainer, Container } from './Styles'

import type { Props } from './Types'

const Overlay: FC<Props> = ({ width, height }) => {
	const { Blocks, SetBlockPosition, SetBlockSize, OverlayRef } =
		useContext(BlocksContext)

	const [, drop] = useDrop<IItem>(
		() => ({
			accept: ItemTypes.Image,
			drop: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset()

				const deltaX = delta?.x ?? 0
				const deltaY = delta?.y ?? 0

				const containerX =
					OverlayRef?.current?.getBoundingClientRect().width ?? 0

				const containerY =
					OverlayRef?.current?.getBoundingClientRect().height ?? 0

				const deltaXPercentage = (deltaX / containerX) * 100
				const deltaYPercentage = (deltaY / containerY) * 100

				let percentageX = deltaXPercentage + Blocks[item.id].position.x
				let percentageY = deltaYPercentage + Blocks[item.id].position.y

				if (percentageX + item.width > 100)
					percentageX = 100 - item.width
				else if (percentageX < 0) percentageX = 0

				if (percentageY + item.height > 100)
					percentageY = 100 - item.height
				else if (percentageY < 0) percentageY = 0

				SetBlockPosition(item.id, {
					x: percentageX,
					y: percentageY,
				})
			},
		}),
		[OverlayRef, Blocks]
	)

	const [, resizeDrop] = useDrop<ISize & { id: string }>(
		() => ({
			accept: ItemTypes.ResizeHandle,
			hover: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset()

				const deltaX = delta?.x ?? 0
				const deltaY = delta?.y ?? 0

				const containerX =
					OverlayRef?.current?.getBoundingClientRect().width ?? 0

				const containerY =
					OverlayRef?.current?.getBoundingClientRect().height ?? 0

				const deltaXPercentage = (deltaX / containerX) * 100
				const deltaYPercentage = (deltaY / containerY) * 100

				let newWidth = item.width + deltaXPercentage
				let newHeight = item.height + deltaYPercentage

				if (Blocks[item.id].position.x + newWidth > 100) newWidth = 100

				if (Blocks[item.id].position.y + newHeight > 100)
					newHeight = 100

				SetBlockSize(item.id, {
					width: newWidth,
					height: newHeight,
				})
			},
		}),
		[Blocks]
	)

	return (
		<OuterContainer
			ref={MergeRef(drop, OverlayRef, resizeDrop)}
			width={width}
			height={height}
		>
			<Container>
				{Object.entries(Blocks).map(([id]) => (
					<BaseBlock key={id} type='Image' id={id} />
				))}
			</Container>
		</OuterContainer>
	)
}

export default Overlay
