import { useState, useCallback, useRef, useEffect } from 'react'

const useDragAndDrop = () => {
	const [elementPosition, setElementPosition] = useState({ top: 0, left: 0 });
	const [elementOffset, setElementOffset] = useState({ x: 0, y: 0 });

	const pointerStartPosition = useRef({ x: null, y: null });
	const pointerMovePosition = useRef({ x: null, y: null });

	const currentDragElement = useRef(null);

	const prevElementOffset = useRef({ x: 0, y: 0 });

	const prevElementOffsetX = useRef(0);
	const prevElementOffsetY = useRef(0);

	const getCurrentPosition = (elem) => {
		const { top, left } = elem.getBoundingClientRect();
		return { top, left };
	};

	const moveDistance = (distance) =>
		setElementOffset({
			x: prevElementOffset.current.x + distance.x,
			y: prevElementOffset.current.y + distance.y
		});

	const resetElementOffset = () => {
		setElementOffset({
			x: 0,
			y: 0
		});

		prevElementOffset.current = {
			x: 0,
			y: 0
		};
	};

	const resetPointerStartPosition = () => {
		if (
			pointerStartPosition.current.x === null ||
			pointerStartPosition.current.y === null
		)
			return;

		pointerStartPosition.current.x = null;
		pointerStartPosition.current.y = null;
	};

	const handleMouseDown = (e) => {
		e.preventDefault();

		pointerStartPosition.current.x = e.clientX;
		pointerStartPosition.current.y = e.clientY;

		currentDragElement.current = e.target;

		const elementCurrentPosition = getCurrentPosition(currentDragElement.current);

		setElementPosition({
			top: elementCurrentPosition.top,
			left: elementCurrentPosition.left
		});
	};

	const handleMouseMove = (e) => {
		e.preventDefault();

		if (!currentDragElement.current) return;
console.log('suga move: ', currentDragElement.current)
		if (
			pointerStartPosition.current.x === null ||
			pointerStartPosition.current.y === null
		)
			return;

		pointerMovePosition.current.x = e.clientX;
		pointerMovePosition.current.y = e.clientY;

		const pointerMoveDistance = {
			x: pointerMovePosition.current.x - pointerStartPosition.current.x,
			y: pointerMovePosition.current.y - pointerStartPosition.current.y
		};

		moveDistance(pointerMoveDistance);
	};

	const handleMouseUp = (e) => {
		e.preventDefault();

		if (!currentDragElement.current) return;

		resetPointerStartPosition();

		const elementCurrentPosition = getCurrentPosition(currentDragElement.current);

		setElementPosition({
			top: elementCurrentPosition.top,
			left: elementCurrentPosition.left
		});

		currentDragElement.current = null;
	};

	const updateElementPosition = (left, top) => {
		setElementPosition(p => ({
			left: left === undefined ? p.left : left,
			top: top === undefined ? p.top : top
		}))
	}

	const updateElementOffset = (x, y) => {
		setElementOffset(p => ({
			x: x === undefined ? p.x : x,
			y: y === undefined ? p.y : y
		}))
	}

	useEffect(() => {
		document.body.addEventListener("mousemove", handleMouseMove);
		document.body.addEventListener("mouseup", handleMouseUp);
		document.body.addEventListener("mouseleave", handleMouseUp);

		return () => {
			document.body.removeEventListener("mousemove", handleMouseMove);
			document.body.removeEventListener("mouseup", handleMouseUp);
			document.body.removeEventListener("mouseleave", handleMouseUp);
		};
	}, []);

	useEffect(() => {
		prevElementOffset.current = {
			x: elementOffset.x,
			y: elementOffset.y
		};
	}, [elementPosition.left, elementPosition.top]);

	return [
		{
			currentDragElement,
			elementPosition,
			elementOffset,
		},
	  {
			pointerStartPosition,
			pointerMovePosition
		},
		handleMouseDown,
		updateElementOffset,
		resetElementOffset,
		updateElementPosition
	];
};

export default useDragAndDrop
