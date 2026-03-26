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
		{
			displayName: 'Region',
			name: 'baseUrl',
			type: 'options',
			options: [
				{
					name: 'EU (Europe)',
					value: 'https://api-euc1.plaud.ai',
				},
				{
					name: 'US (United States)',
					value: 'https://api.plaud.ai',
				},
				{
					name: 'Custom',
					value: 'custom',
				},
			],
			default: 'https://api-euc1.plaud.ai',
			description: 'The API region to connect to. Use Custom to specify your own base URL.',
		},
		{
			displayName: 'Custom Base URL',
			name: 'customBaseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://api.plaud.ai',
			description: 'The custom base URL for the Plaud API (without trailing slash)',
			displayOptions: {
				show: {
					baseUrl: ['custom'],
				},
			},
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
			baseURL:
				'={{$credentials.baseUrl === "custom" ? $credentials.customBaseUrl : $credentials.baseUrl}}',
			url: '/file/simple/web',
		},
	};
}
