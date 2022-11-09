import styled from 'styled-components'

import type { IOuterContainerProps } from './Types'

export const OuterContainer = styled.div<IOuterContainerProps>`
	position: absolute;
	border: 1px solid #000;

	max-width: ${({ width }) => width}px;
	max-height: ${({ height }) => height}px;

	inset: 8% 30% 18% 10%;
`

export const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`
