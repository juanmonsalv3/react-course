export const formatTime = (minuteNumber) => {
	if (isNaN(minuteNumber)) return '00:00';
	let hours = Math.floor(minuteNumber / 60);
	let minutes = minuteNumber - hours * 60;

	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	return `${hours}:${minutes}`;
};
