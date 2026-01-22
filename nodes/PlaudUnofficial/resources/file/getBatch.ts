import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFileGetBatch = {
	operation: ['getBatch'],
	resource: ['file'],
};

export const fileGetBatchDescription: INodeProperties[] = [
	{
		displayName: 'File IDs',
		name: 'fileIds',
		type: 'string',
		displayOptions: { show: showOnlyForFileGetBatch },
		default: '',
		required: true,
		description: 'Comma-separated list of file IDs to retrieve',
	},
];
