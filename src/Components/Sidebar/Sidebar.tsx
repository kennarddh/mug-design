import { FC, useContext, ChangeEvent } from 'react'

import BlocksContext from 'Contexts/Blocks/Blocks'

import { DecimalToPercentage, PercentageToDecimal } from 'Utils/Percentage'

import { Container } from './Styles'

const Sidebar: FC = () => {
	const { SelectedBlockId, Blocks, OverlayRef, SetBlockSize } =
		useContext(BlocksContext)

	const bound = OverlayRef?.current?.getBoundingClientRect()

	const ChangeWidth = (event: ChangeEvent<HTMLInputElement>) => {
		if (!SelectedBlockId) return

		const value = parseInt(event.target.value, 10)

		let percentage = DecimalToPercentage(value, bound?.width ?? 0)

		if (percentage + Blocks[SelectedBlockId].position.x > 100) {
			percentage = 100 - Blocks[SelectedBlockId].position.x
		}

		SetBlockSize(SelectedBlockId, prev => ({
			...prev,
			width: percentage,
		}))
	}

	const ChangeHeight = (event: ChangeEvent<HTMLInputElement>) => {
		if (!SelectedBlockId) return

		const value = parseInt(event.target.value, 10)

		let percentage = DecimalToPercentage(value, bound?.height ?? 0)

		if (percentage + Blocks[SelectedBlockId].position.y > 100) {
			percentage = 100 - Blocks[SelectedBlockId].position.y
		}

		SetBlockSize(SelectedBlockId, prev => ({
			...prev,
			height: percentage,
		}))
	}

	return (
		<Container>
			{SelectedBlockId ? (
				<>
					<label htmlFor='sidebar-width'>
						Width:{' '}
						<input
							type='number'
							value={Math.floor(
								PercentageToDecimal(
									Blocks[SelectedBlockId].size.width,
									bound?.width ?? 0
								)
							)}
							onChange={ChangeWidth}
							min={0}
							step={0}
							max={bound?.width ?? 0}
						/>
					</label>
					<label htmlFor='sidebar-height'>
						Height:{' '}
						<input
							type='number'
							value={Math.floor(
								PercentageToDecimal(
									Blocks[SelectedBlockId].size.height,
									bound?.height ?? 0
								)
							)}
							onChange={ChangeHeight}
							min={0}
							step={0}
							max={bound?.height ?? 0}
						/>
					</label>
				</>
			) : null}
		</Container>
	)
}

export default Sidebar
