import styled from 'styled-components'

import { ContainerProps } from './Types'

export const Container = styled.div.attrs<ContainerProps>(props => ({
	style: {
		height: `${props.height}%`,
		width: `${props.width}%`,
		top: `${props.y}%`,
		left: `${props.x}%`,
	},
}))<ContainerProps>`
	border: 1px solid #000;

	position: absolute;
`
