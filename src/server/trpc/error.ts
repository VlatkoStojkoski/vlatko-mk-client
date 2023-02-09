import type { z } from 'zod';

export type IsAxiosError = {
	isAxiosError: true;
	status?: number;
}

export type IsStrapiError = {
	isStrapiError: true;
	issues?: z.ZodIssue[];
}

export class StrapiOrAxiosError extends Error {
	isAxiosError = false;
	isStrapiError = false;
	message = '';
	status = 0;
	data: unknown = null;
	issues: z.ZodIssue[] = [];

	constructor(errorObj: {
		message: string;
		data: unknown;
	} & (IsAxiosError | IsStrapiError)) {
		super(errorObj.message);

		Object.setPrototypeOf(this, StrapiOrAxiosError.prototype);

		this.message = errorObj.message;
		this.data = errorObj.data;

		if ('isAxiosError' in errorObj && errorObj.isAxiosError) {
			this.name = 'AxiosError';
			this.isAxiosError = true;
			if (errorObj.status) this.status = errorObj.status;
			if (errorObj.data) this.data = errorObj.data;
		}

		if ('isStrapiError' in errorObj && errorObj.isStrapiError) {
			this.name = 'StrapiError';
			this.isStrapiError = true;
			this.issues = errorObj.issues ?? [];
		}
	}
}