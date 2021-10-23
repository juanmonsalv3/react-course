import React, { useState } from 'react';
import './SearchBar.css';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const onChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		onButtonClick();
	};

	const onButtonClick = () => {
		onSearch(searchTerm);
	};

	return (
		<form className='search-bar' onSubmit={onSubmit}>
			<Input
				className='filter-input'
				placeholderText='Enter course Name'
				onChange={onChange}
			/>
			<Button buttonType='submit' buttonText='Search' onClick={onButtonClick} />
		</form>
	);
};

export default SearchBar;
