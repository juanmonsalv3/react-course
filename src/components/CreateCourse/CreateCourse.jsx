import './CreateCourse.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import CreateAuthor from './components/CreateAuthor';
import AuthorSelection from './components/AuthorSelection';
import { formatTime } from '../../helpers/dateGenerator';
import { generateId } from '../../helpers/uuid';

const CreateCourse = ({ authors, addAuthor, onAddCourse }) => {
	const [courseData, setCourseData] = useState({ authors: [] });

	const addCourseData = (key, value) => {
		setCourseData({ ...courseData, [key]: value });
	};

	const onCreateAuthor = (newAuthor) => {
		addAuthor(newAuthor);
		pickAuthor(newAuthor);
	};

	const pickAuthor = (pickedAuthor) => {
		addCourseData('authors', [...courseData.authors, pickedAuthor]);
	};

	const unpickAuthor = (pickedAuthor) => {
		addCourseData(
			'authors',
			courseData.authors.filter((author) => author !== pickedAuthor)
		);
	};

	const addCourse = () => {
		onAddCourse({
			...courseData,
			id: generateId(),
			creationDate: moment().format('DD/MM/yyyy'),
			authors: courseData.authors.map((a) => a.id),
		});
	};

	return (
		<div className='create-course-section'>
			<Button
				buttonText='Create Course'
				className='create-course-btn'
				onClick={addCourse}
			/>
			<Input
				className='create-input'
				labelText='Title'
				placeholderText='Enter Title'
				onChange={(e) => addCourseData('title', e.target.value)}
			/>
			<Input
				className='create-input'
				labelText='Description'
				inputType='textarea'
				placeholderText='Enter Description'
				onChange={(e) => addCourseData('description', e.target.value)}
			/>
			<div className='author-section'>
				<div className='left-section'>
					<CreateAuthor onCreateAuthor={onCreateAuthor} />
					<h4>Duration</h4>
					<Input
						className='create-input'
						labelText='Duration'
						placeholderText='Enter Duration in minutes'
						inputType='number'
						onChange={(e) => addCourseData('duration', +e.target.value)}
					/>
					<p>Duration {formatTime(courseData.duration)} hours</p>
				</div>
				<AuthorSelection
					authors={authors}
					pickedAuthors={courseData.authors}
					pickAuthor={pickAuthor}
					unpickAuthor={unpickAuthor}
				/>
			</div>
		</div>
	);
};

CreateCourse.propTypes = {
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
	addAuthor: PropTypes.func,
	onAddCourse: PropTypes.func,
};

export default CreateCourse;
