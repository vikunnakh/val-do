interface tag {
	_id: string;
	title: string;
}

export interface Challenge {
	_id: string;
	title: string;
	smallDescr: string;
	descr: string;
	img: string;
	level: string;
	tags: tag[];
}
