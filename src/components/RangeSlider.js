import styled from "styled-components";

const StyledRangeSlider = styled.div`
	display: flex;
	align-items: center;
	height: 20vmin;
	position: relative;
	width: 100%;
`;

const Bar = styled.div`
	background-color: #f0f0f0;
	border-radius: 10vmin;
	cursor: pointer;
	height: 10vmin;
	position: absolute;
	width: 100%;
`;

const Handle = styled.div`
	background-color: #ffa44a;
	border-radius: 100%;
	cursor: pointer;
	height: 16vmin;
	position: absolute;
	left: -8vmin;
	transform: translate3d(
		${({ offsetX }) => offsetX}px,
		0,
		0
	);
	width: 16vmin;
`;

const RangeSlider = ({ rangeSlider }) => (
	<StyledRangeSlider className="range-slider">
		<Bar
			className="range-slider-bar"
			ref={rangeSlider.bar.element}
			onMouseDown={rangeSlider.handleMouseDown}
		/>
		<Handle
			className="range-slider-handle"
			ref={rangeSlider.handle.element}
			onMouseDown={rangeSlider.handleMouseDown}
			offsetX={rangeSlider.handle.offsetX}
		/>
	</StyledRangeSlider>
);

export default RangeSlider;
