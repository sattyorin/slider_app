import React from 'react';
import './App.css';
import styled from "styled-components";
import RangeSlider from "./components/RangeSlider"
import useRangeSlider from "./hooks/useRangeSlider"

const StyledApp = styled.div`
	background-color: #8e82bf;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100%;
`;

const Container = styled.div`
	width: 80vmin;
`;

const App = () => {
	const [rangeSlider] = useRangeSlider();
  
	return (
		<StyledApp>
			<Container>
				<RangeSlider rangeSlider={rangeSlider} />
			</Container>
		</StyledApp>
	);
}

export default App;
