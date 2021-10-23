import './CourseCard.css';
import { formatTime } from '../../../../helpers/dateGenerator';
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
				<Button buttonText='Show Course' />
			</div>
		</div>
	);
};

export default CourseCard;
