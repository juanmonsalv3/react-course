import './CreateCourse.css';

import React, { useState } from 'react';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const CreateCourse = ({ authors }) => {
	const [availableAuthors, setAvailableAuthors] = useState(authors);
	const [pickedAuthors, setPickedAuthors] = useState([]);
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
					/>
					<div className='author-btn'>
						<Button buttonText='Create Author' />
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
							<li>
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
							<li>
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
