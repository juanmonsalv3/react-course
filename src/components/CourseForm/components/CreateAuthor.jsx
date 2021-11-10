import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import { addAuthorThunk } from '../../../store/authors/thunks';

const CreateAuthor = () => {
	const [newAuthorName, setNewAuthorName] = useState('');
	const dispatch = useDispatch();

	const onButtonClick = () => {
		if (newAuthorName.length > 1) {
			dispatch(addAuthorThunk(newAuthorName));
			setNewAuthorName('');
		}
	};

	return (
		<div className='add-author-section'>
			<h4>Add Author</h4>
			<Input
				className='create-input'
				labelText='Author Name'
				placeholderText='Enter Author Name'
				onChange={(e) => setNewAuthorName(e.target.value)}
				value={newAuthorName}
			/>
			<div className='author-btn'>
				<Button buttonText='Create Author' onClick={onButtonClick} />
			</div>
		</div>
	);
};

CreateAuthor.propTypes = {
	onCreateAuthor: PropTypes.func,
};

export default CreateAuthor;
