import { FC, createContext, useState, useRef } from 'react'
import ValueOrCallback from 'Utils/ValueOrCallback'

import type {
	IBlocksContext,
	IBlocksContextProviderProps,
	IBlocks,
	ISetBlock,
	ISetBlockPosition,
	ISetBlockSize,
} from './Types'

const BlocksContext = createContext<IBlocksContext>({
	Blocks: {},
	SelectedBlockId: null,
	SetBlocks: () => undefined,
	SetBlock: () => undefined,
	SetBlockSize: () => undefined,
	SetBlockPosition: () => undefined,
	SetSelectedBlockId: () => undefined,
	OverlayRef: null,
})

export const BlocksContextProvider: FC<IBlocksContextProviderProps> = ({
	children,
}) => {
	const [Blocks, SetBlocks] = useState<IBlocks>({
		'adc4c703-0172-4974-98d1-ad26d604ac78': {
			size: { width: 10, height: 10 },
			position: { x: 0, y: 0 },
		},
	})

	const [SelectedBlockId, SetSelectedBlockId] = useState<string | null>(null)

	const OverlayRef = useRef<HTMLDivElement>(null)

	const SetBlock: ISetBlock = (id, dataOrCallback) => {
		const data = ValueOrCallback(dataOrCallback, [Blocks[id]])

		SetBlocks(prev => ({ ...prev, [id]: data }))
	}

	const SetBlockSize: ISetBlockSize = (id, dataOrCallback) => {
		SetBlocks(prev => {
			const data = ValueOrCallback(dataOrCallback, [prev[id].size])

			return {
				...prev,
				[id]: {
					...prev[id],
					size: data,
				},
			}
		})
	}

	const SetBlockPosition: ISetBlockPosition = (id, dataOrCallback) => {
		const data = ValueOrCallback(dataOrCallback, [Blocks[id].position])

		SetBlocks(prev => ({
			...prev,
			[id]: {
				...prev[id],
				position: data,
			},
		}))
	}

	return (
		<BlocksContext.Provider
			value={{
				Blocks,
				SetBlocks,
				SetBlock,
				SetBlockSize,
				SetBlockPosition,
				SelectedBlockId,
				SetSelectedBlockId,
				OverlayRef,
			}}
		>
			{children}
		</BlocksContext.Provider>
	)
}

export default BlocksContext
