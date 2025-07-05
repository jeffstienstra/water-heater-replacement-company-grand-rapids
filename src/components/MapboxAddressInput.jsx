// MapboxAddressInput.jsx
import {useEffect, useRef, useState} from 'react';

const MAPBOX_TOKEN = "pk.eyJ1IjoiamVmZnN0aWVuc3RyYSIsImEiOiJjbWNxaTVraXEwZ3lwMm1wdHJrZHZqZGVlIn0.ndeL1OgVgh4LWekrZKLueQ";

export default function MapboxAddressInput({value, onSelect}) {
	const [inputValue, setInputValue] = useState(value || '');
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const wrapperRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setShowSuggestions(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		const fetchSuggestions = async () => {
			if (inputValue.length < 3) return;
			const res = await fetch(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
					inputValue
				)}.json?country=us&autocomplete=true&access_token=${MAPBOX_TOKEN}`
			);
			const data = await res.json();
			setSuggestions(data.features);
			setShowSuggestions(true);
		};
		const debounce = setTimeout(fetchSuggestions, 300);
		return () => clearTimeout(debounce);
	}, [inputValue]);

	const handleSelect = (feature) => {
		setInputValue(feature.place_name);
		onSelect(feature);
		setSuggestions([]);
		setShowSuggestions(false);
	};

	return (
		<div className="relative" ref={wrapperRef}>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="input input-bordered w-full"
				placeholder="Enter your address"
				autoComplete="off"
			/>
			{showSuggestions && suggestions.length > 0 && (
				<ul className="absolute z-50 mt-1 w-full bg-white border rounded shadow">
					{suggestions.map((feature) => (
						<li
							key={feature.id}
							onClick={() => handleSelect(feature)}
							className="p-2 hover:bg-gray-100 cursor-pointer"
						>
							{feature.place_name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
