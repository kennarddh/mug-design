import { FC, createContext, useState } from 'react'
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
	SetBlocks: () => undefined,
	SetBlock: () => undefined,
	SetBlockSize: () => undefined,
	SetBlockPosition: () => undefined,
})

export const BlocksContextProvider: FC<IBlocksContextProviderProps> = ({
	children,
}) => {
	const [Blocks, SetBlocks] = useState<IBlocks>({})

	const SetBlock: ISetBlock = (id, dataOrCallback) => {
		// eslint-disable-next-line security/detect-object-injection
		const data = ValueOrCallback(dataOrCallback, [Blocks[id]])

		SetBlocks(prev => ({ ...prev, [id]: data }))
	}

	const SetBlockSize: ISetBlockSize = (id, dataOrCallback) => {
		// eslint-disable-next-line security/detect-object-injection
		const data = ValueOrCallback(dataOrCallback, [Blocks[id].size])

		SetBlocks(prev => ({
			...prev,
			[id]: {
				// eslint-disable-next-line security/detect-object-injection
				...Blocks[id],
				size: data,
			},
		}))
	}

	const SetBlockPosition: ISetBlockPosition = (id, dataOrCallback) => {
		// eslint-disable-next-line security/detect-object-injection
		const data = ValueOrCallback(dataOrCallback, [Blocks[id].position])

		SetBlocks(prev => ({
			...prev,
			[id]: {
				// eslint-disable-next-line security/detect-object-injection
				...Blocks[id],
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
			}}
		>
			{children}
		</BlocksContext.Provider>
	)
}

export default BlocksContextProvider
