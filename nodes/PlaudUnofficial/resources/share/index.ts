import type { INodeProperties } from 'n8n-workflow';
import { shareGetPrivateDescription } from './getPrivate';
import { shareGetPublicDescription } from './getPublic';

const showOnlyForShare = {
	resource: ['share'],
};

export const shareDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForShare,
		},
		options: [
			{
				name: 'Get Private',
				value: 'getPrivate',
				action: 'Get private share',
				description: 'Get private share information for a file',
				routing: {
					request: {
						method: 'POST',
						url: '/share/private/get',
					},
					send: {
						type: 'body',
						property: 'file_id',
						value: '={{$parameter.fileId}}',
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
			{
				name: 'Get Public',
				value: 'getPublic',
				action: 'Get public share',
				description: 'Get public share information for a file',
				routing: {
					request: {
						method: 'POST',
						url: '/share/public/get',
					},
					send: {
						type: 'body',
						property: 'file_id',
						value: '={{$parameter.fileId}}',
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
		default: 'getPrivate',
	},
	...shareGetPrivateDescription,
	...shareGetPublicDescription,
];
