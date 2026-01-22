import type { INodeProperties } from 'n8n-workflow';

const showOnlyForShareGetPrivate = {
	operation: ['getPrivate'],
	resource: ['share'],
};

export const shareGetPrivateDescription: INodeProperties[] = [
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: { show: showOnlyForShareGetPrivate },
		default: '',
		required: true,
		description: 'The ID of the file to get private share info for',
	},
];
