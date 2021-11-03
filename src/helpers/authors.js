export const getCourseAuthors = (authors, course) => {
	return course.authors.map((authorId) =>
		authors.find((author) => author.id === authorId)
	);
};
