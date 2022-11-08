import type { Dispatch, SetStateAction } from 'react'

import type { ISize } from 'Types'

export interface Props {
	setSize: Dispatch<SetStateAction<ISize> | ISize>
	size: ISize
}
