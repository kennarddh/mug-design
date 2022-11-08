import { FC, useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Overlay from 'Components/Overlay/Overlay'

import { BlocksContextProvider } from 'Contexts/Blocks/Blocks'

import { Mug, Container, Content } from './AppStyles'

const App: FC = () => {
	const [Size, SetSize] = useState(0)

	const SetOverlaySize = (element: HTMLImageElement): void => {
		const { width } = element?.getBoundingClientRect() || { width: 0 }

		SetSize(width)
	}

	return (
		<Container>
			<Content>
				<Mug src='Mugs/LightGray.jpg' alt='Mug' ref={SetOverlaySize} />

				<DndProvider backend={HTML5Backend}>
					<BlocksContextProvider>
						<Overlay width={Size} height={Size} />
					</BlocksContextProvider>
				</DndProvider>
			</Content>
		</Container>
	)
}

export default App
