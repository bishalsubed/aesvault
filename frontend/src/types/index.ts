
export interface Credentials {
	_id: string;
	account: string;
	password: string;
	webisteLink: string | null;
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

