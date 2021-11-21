import { ADD_COURSE, FETCH_COURSES } from '../actionTypes';
import coursesReducer from '../reducer';

test('reducer should return the initial state', () => {
	const newState = coursesReducer(undefined, { type: 'INIT_STATE' });

	expect(newState).toBeInstanceOf(Array);
	expect(newState.length).toBe(0);
});

test('should handle ADD_COURSE and returns new state', () => {
	const newCourse = {
		id: '1',
		title: 'title',
		description: 'description',
		duration: 10,
		creationDate: '1/1/2021',
	};

	const action = {
		type: ADD_COURSE,
		payload: newCourse,
	};

	const newState = coursesReducer([], action);

	expect(newState).toBeInstanceOf(Array);
	expect(newState.length).toBe(1);
	expect(newState[0].id).toBe('1');
	expect(newState[0].title).toBe('title');
	expect(newState[0].description).toBe('description');
	expect(newState[0].duration).toBe(10);
	expect(newState[0].creationDate).toBe('1/1/2021');
});

test('should handle FETCH_COURSES and returns new state', () => {
	const newCourses = [
		{
			id: '1',
			title: 'title1',
			description: 'description1',
			duration: 10,
			creationDate: '1/1/2021',
		},
		{
			id: '2',
			title: 'title2',
			description: 'description2',
			duration: 30,
			creationDate: '2/2/2021',
		},
	];

	const action = {
		type: FETCH_COURSES,
		payload: newCourses,
	};

	const newState = coursesReducer([], action);

	expect(newState).toBeInstanceOf(Array);
	expect(newState.length).toBe(2);

	expect(newState[0].id).toBe('1');
	expect(newState[0].title).toBe('title1');
	expect(newState[0].description).toBe('description1');
	expect(newState[0].duration).toBe(10);
	expect(newState[0].creationDate).toBe('1/1/2021');

	expect(newState[1].id).toBe('2');
	expect(newState[1].title).toBe('title2');
	expect(newState[1].description).toBe('description2');
	expect(newState[1].duration).toBe(30);
	expect(newState[1].creationDate).toBe('2/2/2021');
});
