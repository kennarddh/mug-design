import { FC, useContext } from 'react'

import BlocksContext from 'Contexts/Blocks/Blocks'

import { Container } from './Styles'

const Sidebar: FC = () => {
	const { SelectedBlockId } = useContext(BlocksContext)

	return <Container>{SelectedBlockId}</Container>
}

export default Sidebar
