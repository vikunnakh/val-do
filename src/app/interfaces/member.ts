export interface Member {
	subscription_id: number;
	subscription_cancelled_on: string;
	subscription_created_on: string;
	subscription_updated_on: string;
	subscription_current_period_start: string;
	subscription_current_period_end: string;
	subscription_coffee_price: string;
	subscription_coffee_num: number;
	subscription_is_cancelled?: any;
	subscription_is_cancelled_at_period_end?: any;
	subscription_currency: string;
	subscription_message: string;
	message_visibility: number;
	subscription_duration_type: string;
	referer?: any;
	country?: any;
	is_razorpay: number;
	subscription_hidden: number;
	membership_level_id: number;
	is_manual_payout: number;
	is_paused: number;
	transaction_id: string;
	payer_email: string;
	payer_name: string;
}
