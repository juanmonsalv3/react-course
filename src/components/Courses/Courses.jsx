import './Courses.css';
import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from '../../mockData';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import { buttonTypes } from '../../constants';
import CourseInfo from '../CourseInfo/CourseInfo';
import { getCourseAuthors } from '../../helpers/authors';

const Courses = () => {
	const history = useHistory();
	const [allCourses, setAllCourses] = useState([]);
	const [courses, setCourses] = useState([]);
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		setAllCourses(mockedCoursesList);
		setCourses(mockedCoursesList);
		setAuthors(mockedAuthorsList);
	}, []);

	const addAuthor = (author) => {
		setAuthors([...authors, author]);
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

	const onAddCourse = (newCourse) => {
		setCourses([...courses, newCourse]);
		history.push('/courses');
	};

	return (
		<div className='courses-section'>
			<Route
				path='/courses'
				exact
				render={(props) => (
					<>
						<Button
							buttonText='Add New Course'
							buttonType={buttonTypes.LINK}
							className='create-course-btn'
							url='/courses/add'
						/>
						<SearchBar onSearch={onSearch} {...props} />
						{courses.length === 0 && <div>No Courses to show</div>}
						<div className='courses-list'>
							{courses.map((course) => (
								<CourseCard
									course={course}
									authors={getCourseAuthors(authors, course)}
									key={course.id}
								/>
							))}
						</div>
					</>
				)}
			/>

			<Route
				path='/courses/add'
				render={(props) => (
					<CreateCourse
						{...props}
						authors={authors}
						addAuthor={addAuthor}
						onAddCourse={onAddCourse}
					/>
				)}
			/>

			<Route
				path='/courses/:courseId'
				render={(props) => {
					return <CourseInfo {...props} courses={courses} authors={authors} />;
				}}
			/>
		</div>
	);
};

export default Courses;
