// MapboxAddressInput.jsx
import {useEffect, useRef, useState} from 'react';

const MAPBOX_TOKEN = "pk.eyJ1IjoiamVmZnN0aWVuc3RyYSIsImEiOiJjbWNxaTVraXEwZ3lwMm1wdHJrZHZqZGVlIn0.ndeL1OgVgh4LWekrZKLueQ";

export default function MapboxAddressInput({value, onSelect, requireDropdown = true, classes}) {
    const [inputValue, setInputValue] = useState(value?.place_name || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selected, setSelected] = useState(!!value);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setInputValue(value?.place_name || '');
        setSelected(!!value);
    }, [value]);

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
        if (!requireDropdown) return;
        if (!selected && inputValue.length > 0) {
            onSelect(null); // Clear parent value if user types after selecting
        }
    }, [inputValue]);

    useEffect(() => {
		if (!requireDropdown) return;
		if (!inputValue || selected) {
			setShowSuggestions(false);
			return;
		}
		if (inputValue.length < 3) return;
		const fetchSuggestions = async () => {
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
	}, [inputValue, requireDropdown, selected]);

    const handleSelect = (feature) => {
        setInputValue(feature.place_name);
        setSelected(true);
        onSelect(feature);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setSelected(false);
    };

    const handleBlur = () => {
        // If not selected from dropdown, clear input
        if (requireDropdown && !selected) {
            setInputValue('');
            onSelect(null);
        }
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`${classes}`}
                placeholder="Enter your address"
                autoComplete="off"
                required
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-white border rounded shadow">
                    {suggestions.map((feature) => (
                        <li
                            key={feature.id}
                            onMouseDown={() => handleSelect(feature)}
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