const isEmpty = (str) => {
	return str.trim() === '' ? true : false;
};
const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email.match(emailRegEx) ? true : false;
};

exports.validateSignupData = (data) => {
	const errors = {};
	if (isEmpty(data.email)) {
		errors.email = 'Must  be not empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be a  valid email address';
	}

	if (isEmpty(data.password)) errors.password = 'Must be not empty';

	if (data.password !== data.confirmPassword) {
		errors.password = 'Passwords must much';
	}

	if (isEmpty(data.userName)) errors.userName = 'Must be not empty';
	return { errors, isValid: Object.keys(errors).length === 0 ? true : false };
};

exports.validateLoginData = (data) => {
	const errors = {};
	if (isEmpty(data.email)) {
		errors.email = 'Must  be not empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be a  valid email address';
	}

	if (isEmpty(data.password)) errors.password = 'Must be not empty';

	return { errors, isValid: Object.keys(errors).length === 0 ? true : false };
};

exports.validateUserData = (data) => {
	const userData = {};
	if (data.bio.trim() !== '') {
		userData.bio = data.bio;
	}

	if (data.location.trim() !== '') {
		userData.location = data.location;
	}

	if (data.website.trim() !== '') {
		if (data.website.startsWith('http')) {
			userData.website = data.website;
		} else {
			userData.website = `http://${data.website}`;
		}
	}

	return userData;
};
