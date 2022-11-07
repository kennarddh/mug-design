import styled from 'styled-components'

import { ContainerProps } from './Types'

export const Container = styled.div<ContainerProps>`
	border: 1px solid #000;

	height: ${({ height }) => height}px;
	width: ${({ width }) => width}px;

	position: absolute;

	top: ${({ y }) => y}%;
	left: ${({ x }) => x}%;
`
