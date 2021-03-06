import './CourseInfo.css';

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { formatTime } from '../../helpers/dateGenerator';
import { getCourseAuthors } from '../../helpers/authors';
import { selectCourses } from '../../store/courses/selectors';
import { selectAuthors } from '../../store/authors/selectors';

const CourseInfo = () => {
	const { courseId } = useParams();
	const courses = useSelector(selectCourses);
	const authors = useSelector(selectAuthors);

	const course = courses.find((c) => c.id === courseId);

	const getBackButton = () => <Link to='/courses'>{'< Back to Courses'}</Link>;

	if (!course || authors.length === 0) {
		return (
			<>
				{getBackButton()}
				<p>Course Not found</p>
			</>
		);
	}

	const { id, title, description, duration, creationDate } = course;

	return (
		<div className='course-info'>
			{getBackButton()}
			<h1 className='course-title'>{title}</h1>
			<div className='course-description'>
				<p>{description}</p>
			</div>
			<div className='course-props'>
				<dl>
					<dt>ID:</dt>
					<dd>{id}</dd>
					<br />
					<dt>Duration:</dt>
					<dd>{formatTime(duration)}</dd>
					<br />
					<dt>Created:</dt>
					<dd>{creationDate}</dd>
					<br />
					<dt>Authors:</dt>
					<br />
					<dd>
						<ul>
							{getCourseAuthors(authors, course).map((author) => (
								<li key={author.id}>{author.name}</li>
							))}
						</ul>
					</dd>
				</dl>
			</div>
		</div>
	);
};

CourseInfo.propTypes = {
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			description: PropTypes.string,
			duration: PropTypes.number,
			authors: PropTypes.arrayOf(PropTypes.string),
		})
	),
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
};

export default CourseInfo;
