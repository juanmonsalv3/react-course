import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import { generateId } from '../../../helpers/uuid';

const CreateAuthor = ({ onCreateAuthor }) => {
	const [newAuthorName, setNewAuthorName] = useState('');

	const onButtonClick = () => {
		if (newAuthorName.length > 1) {
			const newAuthor = {
				name: newAuthorName,
				id: generateId(),
			};
			onCreateAuthor(newAuthor);
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
