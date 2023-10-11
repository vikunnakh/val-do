export interface User {
    _id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: number;
	isAdmin: boolean;
	favorites: string[];
	isVerify: boolean;
	verificationCode?: string;
	registrationDate: Date;
	profileImage: string;
}
