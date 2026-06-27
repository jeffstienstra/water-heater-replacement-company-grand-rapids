// MapboxAddressInput.jsx
import {useEffect, useRef, useState} from 'react';

const MAPBOX_TOKEN = "pk.eyJ1IjoiamVmZnN0aWVuc3RyYSIsImEiOiJjbWNxaTVraXEwZ3lwMm1wdHJrZHZqZGVlIn0.ndeL1OgVgh4LWekrZKLueQ";

function getDisplayValue(value) {
    if (typeof value === 'string') return value;
    return value?.place_name || '';
}

export default function MapboxAddressInput({value, onSelect, onInputChange, classes}) {
    const [inputValue, setInputValue] = useState(getDisplayValue(value));
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selected, setSelected] = useState(typeof value === 'object' && !!value);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const isFocusedRef = useRef(false);

    useEffect(() => {
        setInputValue(getDisplayValue(value));
        setSelected(typeof value === 'object' && !!value);
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
        if (!selected && inputValue.length > 0) {
            onSelect(null);
        }
    }, [inputValue, onSelect, selected]);

    useEffect(() => {
		if (!inputValue || selected) {
			setShowSuggestions(false);
			return;
		}
		if (inputValue.length < 3) return;
		const fetchSuggestions = async () => {
            try {
                const res = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                        inputValue
                    )}.json?country=us&autocomplete=true&access_token=${MAPBOX_TOKEN}`
                );
                const suggestionData = await res.json();
                const nextSuggestions = Array.isArray(suggestionData?.features) ? suggestionData.features : [];
                setSuggestions(nextSuggestions);
                setActiveIndex(-1);
                if (isFocusedRef.current) {
                    setShowSuggestions(nextSuggestions.length > 0);
                }
            } catch {
                setSuggestions([]);
                setShowSuggestions(false);
            }
		};
		const debounce = setTimeout(fetchSuggestions, 300);
		return () => clearTimeout(debounce);
    }, [inputValue, selected]);

    const handleSelect = (feature) => {
        setInputValue(feature.place_name);
        setSelected(true);
        onSelect(feature);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleInputChange = (e) => {
        const nextValue = e.target.value;
        setInputValue(nextValue);
        setSelected(false);
        onInputChange?.(nextValue);
    };

    const handleFocus = () => {
        isFocusedRef.current = true;
    };

    const handleBlur = () => {
        isFocusedRef.current = false;
        setShowSuggestions(false);
        setActiveIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            handleSelect(suggestions[activeIndex]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setActiveIndex(-1);
        }
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`${classes}`}
                placeholder="Enter your address"
                autoComplete="off"
                required
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-30 mt-1 w-full bg-white border rounded shadow">
                    {suggestions.map((feature, index) => (
                        <li
                            key={feature.id}
                            onMouseDown={() => handleSelect(feature)}
                            className={`p-2 cursor-pointer ${index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        >
                            {feature.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}