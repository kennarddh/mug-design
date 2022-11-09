import { FC, useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Overlay from 'Components/Overlay/Overlay'
import Sidebar from 'Components/Sidebar/Sidebar'

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
			<DndProvider backend={HTML5Backend}>
				<BlocksContextProvider>
					<Content>
						<Mug
							src='Mugs/LightGray.jpg'
							alt='Mug'
							ref={SetOverlaySize}
						/>

						<Overlay width={Size} height={Size} />
					</Content>
					<Sidebar />
				</BlocksContextProvider>
			</DndProvider>
		</Container>
	)
}

export default App
