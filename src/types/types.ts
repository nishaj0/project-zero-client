export type ApiError = {
	status: string;
	statusCode: number;
	message: string;
	field?: string;
	errors?: {
		path: string;
		message: string;
	}[];
};
