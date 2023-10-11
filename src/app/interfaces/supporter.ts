export interface Supporter {
	current_page: number;
	data: Data[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	next_page_url: string;
	path: string;
	per_page: number;
	prev_page_url?: any;
	to: number;
	total: number;
}

interface Data {
	support_id: number;
	support_note?: any;
	support_coffees: number;
	transaction_id: string;
	support_visibility: number;
	support_created_on: string;
	support_updated_on: string;
	transfer_id?: any;
	supporter_name?: any;
	support_coffee_price: string;
	support_email: string;
	is_refunded?: any;
	support_currency: string;
	support_note_pinned: number;
	referer?: any;
	country?: string;
	payer_email: string;
	payment_platform: string;
	payer_name: string;
}
