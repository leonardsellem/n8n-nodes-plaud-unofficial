import type { INodeProperties } from 'n8n-workflow';
import { folderGetAllDescription } from './getAll';

const showOnlyForFolders = {
	resource: ['folder'],
};

export const folderDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForFolders,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many folders',
				description: 'Get many folders (tags) from the account',
				routing: {
					request: {
						method: 'GET',
						url: '/filetag/',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
	...folderGetAllDescription,
];
