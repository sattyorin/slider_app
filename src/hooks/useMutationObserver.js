import { useEffect } from 'react'

const useMutationObserver = (elements, callback, config) => {
	useEffect(() => {
		const mutationObserver = new MutationObserver((mutations) => {
			mutationObserver.disconnect();
			callback(mutations);
			for (const elem of elements) {
				elem.current && mutationObserver.observe(elem.current, config);
			}
		});

		for (const elem of elements) {
			elem.current && mutationObserver.observe(elem.current, config);
		}

		return () => mutationObserver.disconnect();
	}, []);
};

export default useMutationObserver
