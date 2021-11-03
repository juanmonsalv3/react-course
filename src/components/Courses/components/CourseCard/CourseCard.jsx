import './CourseCard.css';
import PropTypes from 'prop-types';
import { formatTime } from '../../../../helpers/dateGenerator';
import { buttonTypes } from '../../../../constants';
import Button from '../../../../common/Button/Button';

const CourseCard = ({ course, authors }) => {
	const getAuthorsElement = () =>
		authors.map((author) => author.name).join(', ');

	return (
		<div className='course-card'>
			<div className='main-section'>
				<h2 className='course-title'>{course.title}</h2>
				<p>{course.description}</p>
			</div>
			<div className='side-section'>
				<p>
					<b>Authors: </b>
					{getAuthorsElement()}
				</p>
				<p>
					<b>Duration: </b>
					{formatTime(course.duration)} hours
				</p>
				<p>
					<b>Created: </b> {course.creationDate}
				</p>
				<Button
					buttonType={buttonTypes.LINK}
					buttonText='Show Course'
					url={`/courses/${course.id}`}
				/>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	course: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		duration: PropTypes.number,
		authors: PropTypes.arrayOf(PropTypes.string),
	}),
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
};

export default CourseCard;
