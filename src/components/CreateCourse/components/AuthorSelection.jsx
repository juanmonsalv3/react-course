import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';

const AuthorSelection = ({
	authors,
	pickedAuthors = [],
	pickAuthor,
	unpickAuthor,
}) => {
	const [availableAuthors, setAvailableAuthors] = useState(authors);

	useEffect(() => {
		const avAuthors = authors.filter((a) => !pickedAuthors.includes(a));
		setAvailableAuthors(avAuthors);
	}, [authors, pickedAuthors]);

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
				{pickedAuthors.map((author) => (
					<li key={author.id}>
						<div className='author-name'>{author.name}</div>
						<div>
							<Button
								buttonText='Delete Author'
								onClick={() => unpickAuthor(author)}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

const authorShape = PropTypes.shape({
	id: PropTypes.string,
	name: PropTypes.string,
});

AuthorSelection.propTypes = {
	authors: PropTypes.arrayOf(authorShape),
	pickedAuthors: PropTypes.arrayOf(authorShape),
	pickAuthor: PropTypes.func,
	unpickAuthor: PropTypes.func,
};

export default AuthorSelection;
