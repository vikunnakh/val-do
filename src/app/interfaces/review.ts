
export interface Review {
    _id: string;
	description: string;
	star: number;
	date: string;
	user: User;
	isPublished: boolean;
}

interface User {
	_id: string;
	firstName: string;
	lastName: string;
	userId: string;
}