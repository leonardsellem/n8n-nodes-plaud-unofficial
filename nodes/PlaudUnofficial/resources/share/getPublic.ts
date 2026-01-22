import type { INodeProperties } from 'n8n-workflow';

const showOnlyForShareGetPublic = {
	operation: ['getPublic'],
	resource: ['share'],
};

export const shareGetPublicDescription: INodeProperties[] = [
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: { show: showOnlyForShareGetPublic },
		default: '',
		required: true,
		description: 'The ID of the file to get public share info for',
	},
];
