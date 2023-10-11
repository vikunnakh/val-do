import { User } from "./user";

interface Skill {
	_id?: string;
	title: string;
}
interface Language extends Skill {}

interface Education {
	_id?: string;
	title: string;
	descr: string;
	startDate: string;
	endDate: string;
}

interface Experience extends Education {}

export interface Cv {
    _id?: string;
	user: User;
	role: string;
	about: string;
	location: string;
	address: string;
	skills: Skill[];
	education: Education[];
	experience: Experience[];
	languages: Language[];
}
