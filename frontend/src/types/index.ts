
export interface Credential {
	_id: string;
	account: string;
	password: string;
	websiteUrl: string;
    owner:string;
	createdAt: string;
	updatedAt: string;
}

export interface User {
	_id: string;
	username: string;
    email: string;
    credentials: string | null;
    createdAt: string;
	updatedAt: string;
}

