export interface Axios {
	methods: 'get' | 'post' | 'put' | 'delete';
	url: string;
	body?: any;
	header?: any;
}
