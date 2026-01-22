import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFileGet = {
	operation: ['get'],
	resource: ['file'],
};

export const fileGetDescription: INodeProperties[] = [
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: { show: showOnlyForFileGet },
		default: '',
		required: true,
		description: 'The ID of the file to retrieve',
	},
];
