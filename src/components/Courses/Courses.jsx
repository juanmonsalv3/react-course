import './Courses.css';
import React, { useState, useEffect } from 'react';
import { mockedAuthorsList, mockedCoursesList } from '../../mockData';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';

const Courses = () => {
	const [allCourses, setAllCourses] = useState([]);
	const [courses, setCourses] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [createCourseOpen, setCreateCourseOpen] = useState(false);

	useEffect(() => {
		setAllCourses(mockedCoursesList);
		setCourses(mockedCoursesList);
		setAuthors(mockedAuthorsList);
	}, []);

	const getCourseAuthors = (course) => {
		return course.authors.map((authorId) =>
			authors.find((author) => author.id === authorId)
		);
	};

	const onSearch = (term) => {
		const includesTerm = (prop) => (prop || '').toLowerCase().includes(term);

		const filteredCourses = allCourses.filter((c) => {
			return (
				includesTerm(c.title) ||
				includesTerm(c.description) ||
				includesTerm(c.id)
			);
		});

		setCourses(filteredCourses);
	};

	return (
		<div className='courses-section'>
			<Button
				buttonText='Create Course'
				className='create-course-btn'
				onClick={() => setCreateCourseOpen(!createCourseOpen)}
			/>
			{!createCourseOpen && <SearchBar onSearch={onSearch} />}
			{!createCourseOpen && courses.length === 0 && (
				<div>No Courses to show</div>
			)}
			{!createCourseOpen && (
				<div className='courses-list'>
					{courses.map((course) => (
						<CourseCard
							course={course}
							authors={getCourseAuthors(course)}
							key={course.id}
						/>
					))}
				</div>
			)}

			{createCourseOpen && <CreateCourse authors={authors} />}
		</div>
	);
};

export default Courses;
