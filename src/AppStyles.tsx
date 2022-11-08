import styled from 'styled-components'

export const Mug = styled.img`
	width: 100%;
	z-index: -10;
`

export const Content = styled.div`
	width: 500px;

	position: relative;

	grid-area: content;
`

export const Container = styled.div`
	width: 100vw;
	height: 100vh;

	display: grid;

	grid-template-areas:
		'empty content sidebar'
		'empty content sidebar'
		'empty empty sidebar';
`
