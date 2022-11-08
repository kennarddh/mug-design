import { FC } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Overlay from 'Components/Overlay/Overlay'

import { BlocksContextProvider } from 'Contexts/Blocks/Blocks'

import { Mug, Container, Content } from './AppStyles'

const App: FC = () => {
	return (
		<Container>
			<Content>
				<Mug src='Mugs/LightGray.jpg' alt='Mug' />

				<DndProvider backend={HTML5Backend}>
					<BlocksContextProvider>
						<Overlay />
					</BlocksContextProvider>
				</DndProvider>
			</Content>
		</Container>
	)
}

export default App
