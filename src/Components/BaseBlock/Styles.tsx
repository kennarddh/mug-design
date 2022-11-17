import styled from 'styled-components'

import { ContainerProps, InnerProps } from './Types'

export const Container = styled.div.attrs<ContainerProps>(props => ({
	style: {
		top: `${props.y}%`,
		left: `${props.x}%`,
		height: `${props.height}%`,
		width: `${props.width}%`,
	},
}))<ContainerProps>`
	position: absolute;

	border: 1px solid #f00;
`
export const Inner = styled.div<InnerProps>`
	border: 1px solid #000;

	rotate: 1rad;
	position: absolute;
	top: 0;

	height: 100%;
	width: 100%;
`
