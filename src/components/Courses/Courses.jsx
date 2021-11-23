import './Courses.css';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute/PrivateRoute';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CourseForm from '../CourseForm/CourseForm';
import CourseInfo from '../CourseInfo/CourseInfo';
import loginRequired from '../../common/loginRequired';
import { buttonTypes } from '../../constants';
import { selectCourses } from '../../store/courses/selectors';
import { fetchAuthorsThunk } from '../../store/authors/thunks';
import { fetchCoursesThunk } from '../../store/courses/thunks';

const Courses = ({ fetchCourses = true }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const allCourses = useSelector(selectCourses);
	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchCourses) {
			dispatch(fetchCoursesThunk());
			dispatch(fetchAuthorsThunk());
		}
	}, [dispatch, fetchCourses]);

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
		<div className='courses-section' data-testid='courses-section'>
			<Route
				path='/courses'
				exact
				render={(props) => (
					<>
						<Button
							buttonText='Add New Course'
							buttonType={buttonTypes.LINK}
							testId='create-course-btn'
							className='create-course-btn'
							url='/courses/add'
						/>
						<SearchBar onSearch={onSearch} {...props} />
						{filteredCourses.length === 0 && (
							<div data-testid='no-courses-notice'>No Courses to show</div>
						)}
						<div className='courses-list' data-testid='courses-list'>
							{filteredCourses.map((course) => (
								<CourseCard {...course} key={course.id} />
							))}
						</div>
					</>
				)}
			/>
			<Switch>
				<PrivateRoute exact path='/courses/add' component={CourseForm} />
				<PrivateRoute
					exact
					path='/courses/update/:courseId'
					component={CourseForm}
				/>
				<Route eact path='/courses/:courseId' component={CourseInfo} />
			</Switch>
		</div>
	);
};

export default loginRequired(Courses);
