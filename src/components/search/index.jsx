import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../App';
import './style.css';

const Search = ({
	dummyData,
	getData,
	APIResponse,
	 setAPIResponse,
}) => {
	const {theme}=useContext(ThemeContext);
	const [inputValue, setInputValue] = useState('');

	const handelInputChange = (event) => {
		const { value } = event.target;
		setInputValue(value);
	};
	const handelSubmit = (event) => {
		event.preventDefault();
		getData(inputValue);
	};

	useEffect(() => {
		if (APIResponse) {
			setInputValue('');
			setAPIResponse(false);
		}
	}, [APIResponse]);

	return (
		<form className="Search" onSubmit={handelSubmit}>
			<input
				type="text"
				name="Search"
				id="Serach"
				onChange={handelInputChange}
				value={inputValue}
				placeholder="Search Recipes"
			/>
			<button style={theme? { backgroundColor: '#12343b' }:{}} type="submit"> Search </button> </form>
	);
};

export default Search;
