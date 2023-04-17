import { 
  useState,
  useCallback,
  useRef,
  useEffect
} from 'react'

import useDragAndDrop from '../hooks/useDragAndDrop'
import useMutationObserver from '../hooks/useMutationObserver'
import useResizeObserver from '../hooks/useResizeObserver'
import { clamp } from '../utils'

const useRangeSlider = () => {
const [
  { 
    currentDragElement,
    elementPosition,
    elementOffset
  },
  { 
    pointerStartPosition,
    pointerMovePosition
  },
  handleMouseDown,
  setElementOffset,
  resetElementOffset,
  setElementPosition
] = useDragAndDrop();

const [rangeSliderHandleOffsetX, setRangeSliderHandleOffsetX] = useState(
  0
);

const [rangeSliderHandleWidth, setRangeSliderHandleWidth] = useState(0);
const [rangeSliderBarWidth, setRangeSliderBarWidth] = useState(0);

const [rangeSliderBarPosition, setRangeSliderBarPosition] = useState({
  left: 0,
  top: 0
});
const [rangeSliderHandlePosition, setRangeSliderHandlePosition] = useState(0);

const rangeSliderBarScale = useRef(1)

const rangeSliderHandleElement = useRef(null);
const rangeSliderBarElement = useRef(null);

const previousRangeSliderBarWidth = useRef(0)

useResizeObserver(
  [rangeSliderBarElement],
  (entries) => {
    const entry = entries[0]
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;

    setRangeSliderBarWidth(width);

    const rect = entry.target.getBoundingClientRect();
    setRangeSliderBarPosition({
      left: rect.left,
      top: rect.top
    });
  }
);

useResizeObserver(
  [rangeSliderHandleElement],
  (entries) => {
    const entry = entries[0]

    const width = entry.contentRect.width;
    const height = entry.contentRect.height;

    if(width === 0 || height === 0) return

    setRangeSliderHandleWidth(width);

    rangeSliderBarScale.current =
      previousRangeSliderBarWidth.current === 0
      ? 1
    : width / previousRangeSliderBarWidth.current;

    previousRangeSliderBarWidth.current = width

    setRangeSliderHandleOffsetX((p) => p * rangeSliderBarScale.current)

    const left = entry.target.getBoundingClientRect().left;
    setRangeSliderHandlePosition(left);
  }
)

useMutationObserver(
  [rangeSliderHandleElement],
  (mutations) => {
    const left = mutations[0].target.getBoundingClientRect().left;
    setRangeSliderHandlePosition(left);
  },
  {
          attributes: true,
          subtree: false,
          childList: false,
          attributeFilter: ["class"]
      }
);

useEffect(() => {
  if (!currentDragElement.current) return;

  const rect = rangeSliderBarElement.current.getBoundingClientRect()

  const startX = pointerStartPosition.current.x - rect.left;

  setRangeSliderHandleOffsetX(clamp(startX, 0, rangeSliderBarWidth));
}, [elementPosition]);

useEffect(() => {
  const rect = rangeSliderBarElement.current.getBoundingClientRect()

  const moveX = pointerMovePosition.current.x - rect.left

  setRangeSliderHandleOffsetX((p) => clamp(moveX, 0, rangeSliderBarWidth));
}, [elementOffset]);

return [
  {
    handle: {
      element: rangeSliderHandleElement,
      offsetX: rangeSliderHandleOffsetX,
      position: elementPosition,
      width: rangeSliderHandleWidth
    },
    bar: {
      element: rangeSliderBarElement,
      position: rangeSliderBarPosition,
      width: rangeSliderBarWidth,
      scale: rangeSliderBarScale
    },
    handleMouseDown
  },
  setRangeSliderHandleOffsetX
];
};

export default useRangeSlider;
