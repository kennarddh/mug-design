import styled from 'styled-components'

export const Mug = styled.img`
	width: 100%;
	z-index: -10;
`

export const Content = styled.div`
	position: relative;

	grid-area: content;
`

export const Container = styled.div`
	width: 100vw;
	height: 100vh;

	display: grid;

	grid-template-columns: 0.6fr 1fr 0.6fr;

	grid-column-gap: 24px;

	grid-template-areas: '. content sidebar';
`
