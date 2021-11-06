import './Courses.css';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import CourseInfo from '../CourseInfo/CourseInfo';
import loginRequired from '../../common/loginRequired';
import { fetchCourses } from '../../store/courses/actionCreators';
import { buttonTypes } from '../../constants';
import { selectCourses } from '../../store/courses/selectors';
import { fetchAuthors } from '../../store/authors/actionCreators';

const Courses = () => {
	const allCourses = useSelector(selectCourses);
	const [searchTerm, setSearchTerm] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCourses);
		dispatch(fetchAuthors);
	}, [dispatch]);

	const includesTerm = (prop) =>
		(prop || '').toLowerCase().includes(searchTerm);

	const filteredCourses = allCourses.filter((c) => {
		return (
			includesTerm(c.title) || includesTerm(c.description) || includesTerm(c.id)
		);
	});

	const onSearch = (term) => {
		setSearchTerm(term);
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
						{filteredCourses.length === 0 && <div>No Courses to show</div>}
						<div className='courses-list'>
							{filteredCourses.map((course) => (
								<CourseCard {...course} key={course.id} />
							))}
						</div>
					</>
				)}
			/>
			<Switch>
				<Route exact path='/courses/add' component={CreateCourse} />
				<Route path='/courses/:courseId' component={CourseInfo} />
			</Switch>
		</div>
	);
};

export default loginRequired(Courses);
