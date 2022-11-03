import { FC } from 'react'

import Overlay from 'Components/Overlay/Overlay'

import { Mug, Container, Content } from './AppStyles'

const App: FC = () => {
	return (
		<Container>
			<Content>
				<Mug src='Mugs/LightGray.jpg' alt='Mug' />
				<Overlay />
			</Content>
		</Container>
	)
}

export default App
