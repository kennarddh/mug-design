import type { ReactNode } from 'react'
import type { XYCoord } from 'react-dnd'
import type { ISize, ReactSetState } from 'Types'

export interface IBlocksContextProviderProps {
	children: ReactNode
}

export interface IBlock {
	size: ISize
	position: XYCoord
}

export interface IBlocks {
	[key: string]: IBlock
}

export type ISetBlockDataOrCallback = IBlock | ((prev: IBlock) => IBlock)

export type ISetBlockSizeDataOrCallback = ISize | ((prev: ISize) => ISize)

export type ISetBlockPositionDataOrCallback =
	| XYCoord
	| ((prev: XYCoord) => XYCoord)

export type ISetBlock = (
	id: string,
	dataOrCallback: ISetBlockDataOrCallback
) => void

export type ISetBlockPosition = (
	id: string,
	dataOrCallback: ISetBlockPositionDataOrCallback
) => void

export type ISetBlockSize = (
	id: string,
	dataOrCallback: ISetBlockSizeDataOrCallback
) => void

export interface IBlocksContext {
	Blocks: IBlocks
	SetBlocks: ReactSetState<IBlocks>
	SetBlock: ISetBlock
	SetBlockSize: ISetBlockSize
	SetBlockPosition: ISetBlockPosition
}
