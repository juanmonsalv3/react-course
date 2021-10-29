import './CreateCourse.css';

import React, { useState, useEffect } from 'react';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { generateId } from '../../helpers/uuid';

const CreateCourse = ({ authors, addAuthor }) => {
	const [availableAuthors, setAvailableAuthors] = useState(authors);
	const [pickedAuthors, setPickedAuthors] = useState([]);
	const [newAuthorName, setNewAuthorName] = useState('');

	useEffect(() => {
		pickedAuthors.forEach((picked) => {
			const index = authors.indexOf(picked);
			if (index > -1) {
				setAvailableAuthors(authors.slice(index, 1));
			}
		});
	}, [authors, pickedAuthors]);

	const onCreateAuthor = () => {
		if (newAuthorName.length < 2) {
			return;
		}
		const newAuthor = {
			name: newAuthorName,
			id: generateId(),
		};
		addAuthor(newAuthor);

		setPickedAuthors([...pickedAuthors, newAuthor]);
	};

	return (
		<div className='create-course-section'>
			<Input
				className='create-input'
				labelText='Title'
				placeholderText='Enter Title'
			/>
			<Input
				className='create-input'
				labelText='Description'
				inputType='textarea'
				placeholderText='Enter Description'
			/>
			<div className='author-section'>
				<div className='left-section'>
					<h4>Add Author</h4>
					<Input
						className='create-input'
						labelText='Author Name'
						placeholderText='Enter Author Name'
						onChange={(e) => setNewAuthorName(e.target.value)}
					/>
					<div className='author-btn'>
						<Button buttonText='Create Author' onClick={onCreateAuthor} />
					</div>
					<h4>Duration</h4>
					<Input
						className='create-input'
						labelText='Duration'
						placeholderText='Enter Duration in minutes'
						inputType='number'
					/>
				</div>
				<div className='authors-list'>
					<h4>Authors</h4>
					<ul>
						{availableAuthors.map((author) => (
							<li key={author.id}>
								<div className='author-name'>{author.name}</div>
								<div>
									<Button buttonText='Add Author' />
								</div>
							</li>
						))}
					</ul>

					<h4>Course Authors</h4>
					{pickedAuthors.length === 0 && <span>Author list is empty</span>}
					<ul>
						{pickedAuthors.map((author) => (
							<li key={author.id}>
								<div className='author-name'>{author.name}</div>
								<div>
									<Button buttonText='Delete Author' />
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;
