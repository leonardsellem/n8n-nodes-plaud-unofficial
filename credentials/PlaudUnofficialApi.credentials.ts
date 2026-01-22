import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PlaudUnofficialApi implements ICredentialType {
	name = 'plaudUnofficialApi';

	displayName = 'Plaud Unofficial API';

	icon = { light: 'file:plaudUnofficial.svg', dark: 'file:plaudUnofficial.dark.svg' } as const;

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/-plaud-unofficial?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api-euc1.plaud.ai',
			url: '/file/simple/web',
		},
	};
}
