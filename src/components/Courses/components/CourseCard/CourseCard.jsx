import './CourseCard.css';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { formatTime } from '../../../../helpers/dateGenerator';
import { buttonTypes } from '../../../../constants';
import { selectAuthors } from '../../../../store/authors/selectors';

import Button from '../../../../common/Button/Button';

const CourseCard = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
}) => {
	const allAuthors = useSelector(selectAuthors);

	const courseAuthors =
		allAuthors.length > 0
			? authors.map((authorId) =>
					allAuthors.find((author) => author.id === authorId)
			  )
			: [];

	const getAuthorsElement = () =>
		courseAuthors.map((author) => author.name).join(', ');

	return (
		<div className='course-card'>
			<div className='main-section'>
				<h2 className='course-title'>{title}</h2>
				<p>{description}</p>
			</div>
			<div className='side-section'>
				<p>
					<b>Authors: </b>
					{getAuthorsElement()}
				</p>
				<p>
					<b>Duration: </b>
					{formatTime(duration)} hours
				</p>
				<p>
					<b>Created: </b> {creationDate}
				</p>
				<Button
					buttonType={buttonTypes.LINK}
					buttonText='Show Course'
					url={`/courses/${id}`}
				/>
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
