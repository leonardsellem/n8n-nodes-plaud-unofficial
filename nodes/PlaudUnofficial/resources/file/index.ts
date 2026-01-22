import type { INodeProperties } from 'n8n-workflow';
import { fileGetAllDescription } from './getAll';
import { fileGetDescription } from './get';
import { fileDownloadDescription } from './download';
import { fileGetBatchDescription } from './getBatch';

const showOnlyForFiles = {
	resource: ['file'],
};

export const fileDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForFiles,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many files',
				description: 'Get many files from the account',
				routing: {
					request: {
						method: 'GET',
						url: '/file/simple/web',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data_file_list',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a file',
				description: 'Get details of a single file',
				routing: {
					request: {
						method: 'GET',
						url: '=/file/detail/{{$parameter.fileId}}',
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
				name: 'Download',
				value: 'download',
				action: 'Download audio',
				description: 'Download the audio file',
			},
			{
				name: 'Get Batch',
				value: 'getBatch',
				action: 'Get batch of files',
				description: 'Get multiple files by their IDs',
				routing: {
					request: {
						method: 'POST',
						url: '/file/list',
					},
					send: {
						type: 'body',
						property: 'file_ids',
						value: '={{ $parameter.fileIds.split(",").map(id => id.trim()) }}',
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
	...fileGetAllDescription,
	...fileGetDescription,
	...fileDownloadDescription,
	...fileGetBatchDescription,
];
