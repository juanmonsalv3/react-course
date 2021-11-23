import './CourseForm.css';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import CreateAuthor from './components/CreateAuthor';
import AuthorSelection from './components/AuthorSelection';
import { formatTime } from '../../helpers/dateGenerator';
import { addCourseThunk, updateCourseThunk } from '../../store/courses/thunks';
import { useSelector } from 'react-redux';
import { selectCourses } from '../../store/courses/selectors';

const CourseForm = () => {
	const { courseId } = useParams();
	const courses = useSelector(selectCourses);

	let foundCourse;
	if (courseId) {
		foundCourse = courses.find((c) => c.id === courseId);
	}

	const [totalCourses] = useState(courses.length);
	const [courseData, setCourseData] = useState(foundCourse || { authors: [] });
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (courses.length !== totalCourses) {
			history.push('/courses');
		}
	}, [courses, totalCourses, history]);

	const addCourseData = (key, value) => {
		setCourseData({ ...courseData, [key]: value });
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

	const onSaveCourse = () => {
		if (courseData.authors.length === 0) {
			return;
		}

		if (courseId) {
			dispatch(updateCourseThunk(courseData));
			history.push('/courses');
		} else {
			dispatch(addCourseThunk(courseData));
		}
	};

	return (
		<div className='create-course-section' data-testid='course-form-section'>
			<p>
				<Link to='/courses'>{'< Back to Courses'}</Link>
			</p>
			<Button
				buttonText={`${courseId ? 'Update' : 'Create'} Course`}
				className='create-course-btn'
				onClick={onSaveCourse}
			/>
			<Input
				className='create-input input-title'
				labelText='Title'
				placeholderText='Enter Title'
				value={courseData.title}
				onChange={(e) => addCourseData('title', e.target.value)}
			/>
			<Input
				className='create-input input-description'
				labelText='Description'
				inputType='textarea'
				placeholderText='Enter Description'
				value={courseData.description}
				onChange={(e) => addCourseData('description', e.target.value)}
			/>
			<div className='author-section'>
				<div className='left-section'>
					<CreateAuthor />
					<h4>Duration</h4>
					<Input
						className='create-input'
						labelText='Duration'
						placeholderText='Enter Duration in minutes'
						inputType='number'
						value={courseData.duration}
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

export default CourseForm;
