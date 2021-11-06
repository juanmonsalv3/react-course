import './CreateCourse.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import CreateAuthor from './components/CreateAuthor';
import AuthorSelection from './components/AuthorSelection';
import { formatTime } from '../../helpers/dateGenerator';
import { addAuthor } from '../../store/authors/actionCreators';
import { addCourse } from '../../store/courses/actionCreators';

const CreateCourse = () => {
	const [courseData, setCourseData] = useState({ authors: [] });
	const dispatch = useDispatch();
	const history = useHistory();

	const addCourseData = (key, value) => {
		setCourseData({ ...courseData, [key]: value });
	};

	const onCreateAuthor = (newAuthor) => {
		dispatch(addAuthor(newAuthor));
		pickAuthor(newAuthor);
	};

	const pickAuthor = (pickedAuthor) => {
		addCourseData('authors', [...courseData.authors, pickedAuthor.id]);
	};

	const unpickAuthor = (pickedAuthor) => {
		addCourseData(
			'authors',
			courseData.authors.filter((author) => author !== pickedAuthor.id)
		);
	};

	const onAddCourse = () => {
		dispatch(addCourse(courseData));
		history.push('/courses');
	};

	return (
		<div className='create-course-section'>
			<p>
				<Link to='/courses'>{'< Back to Courses'}</Link>
			</p>
			<Button
				buttonText='Create Course'
				className='create-course-btn'
				onClick={onAddCourse}
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
