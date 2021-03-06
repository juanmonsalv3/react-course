import './CourseCard.css';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { formatTime } from '../../../../helpers/dateGenerator';
import { buttonTypes } from '../../../../constants';
import { selectAuthors } from '../../../../store/authors/selectors';

import Button from '../../../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { deleteCourseThunk } from '../../../../store/courses/thunks';

const CourseCard = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
}) => {
	const allAuthors = useSelector(selectAuthors);
	const dispatch = useDispatch();

	const courseAuthors =
		allAuthors.length > 0
			? authors.map((authorId) =>
					allAuthors.find((author) => author.id === authorId)
			  )
			: [];

	const getAuthorsElement = () =>
		courseAuthors.map((author) => author.name).join(', ');

	const deleteCourse = (id) => {
		dispatch(deleteCourseThunk(id));
	};

	return (
		<div className='course-card' data-testid='course-card'>
			<div className='main-section'>
				<h2 className='course-title' data-testid='course-title'>
					{title}
				</h2>
				<p data-testid='course-description'>{description}</p>
			</div>
			<div className='side-section'>
				<p>
					<b>Authors: </b>
					<span data-testid='course-authors'>{getAuthorsElement()}</span>
				</p>
				<p>
					<b>Duration: </b>
					<span data-testid='course-duration'>
						{formatTime(duration)} hours
					</span>
				</p>
				<p>
					<b>Created: </b>{' '}
					<span data-testid='course-creation-date'>{creationDate}</span>
				</p>
				<Button
					buttonType={buttonTypes.LINK}
					buttonText='Show Course'
					url={`/courses/${id}`}
				/>
				<Button buttonType={buttonTypes.LINK} url={`/courses/update/${id}`}>
					<img className='btn-img' alt='edit course' src='/icons8-edit.svg' />
				</Button>
				<Button
					buttonType={buttonTypes.BUTTON}
					onClick={() => deleteCourse(id)}
				>
					<img
						className='btn-img'
						alt='delete course'
						src='/icons8-trash.svg'
					/>
				</Button>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	duration: PropTypes.number,
	authors: PropTypes.arrayOf(PropTypes.string),
};

export default CourseCard;
