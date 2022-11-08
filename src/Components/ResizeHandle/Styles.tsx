import styled from 'styled-components'

export const Handle = styled.div`
	--size: 10px;

	width: var(--size);
	height: var(--size);
	background-color: #f00;
	top: calc(100% - (var(--size) / 2));
	left: calc(100% - (var(--size) / 2));

	position: absolute;
`

export const Handles = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`
