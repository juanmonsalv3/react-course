import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';
import { useSelector } from 'react-redux';
import { selectAuthors } from '../../../store/authors/selectors';

const AuthorSelection = ({ pickedAuthors = [], pickAuthor, unpickAuthor }) => {
	const allAuthors = useSelector(selectAuthors);
	const [availableAuthors, setAvailableAuthors] = useState(allAuthors);

	useEffect(() => {
		const availableAuthors = allAuthors.filter(
			(author) => !pickedAuthors.includes(author.id)
		);
		setAvailableAuthors(availableAuthors);
	}, [allAuthors, pickedAuthors]);

	return (
		<div className='authors-list'>
			<h4>Authors</h4>
			<ul>
				{availableAuthors.map((author) => (
					<li key={author.id}>
						<div className='author-name'>{author.name}</div>
						<div>
							<Button
								buttonText='Add Author'
								onClick={() => pickAuthor(author)}
							/>
						</div>
					</li>
				))}
			</ul>

			<h4>Course Authors</h4>
			{pickedAuthors.length === 0 && <span>Author list is empty</span>}
			<ul>
				{pickedAuthors.map((authorId) => {
					const author = allAuthors.find((a) => a.id === authorId);
					return (
						<li key={author.id}>
							<div className='author-name'>{author.name}</div>
							<div>
								<Button
									buttonText='Delete Author'
									onClick={() => unpickAuthor(author)}
								/>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

AuthorSelection.propTypes = {
	pickedAuthors: PropTypes.arrayOf(PropTypes.string),
	pickAuthor: PropTypes.func,
	unpickAuthor: PropTypes.func,
};

export default AuthorSelection;
