import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAiGetStatus = {
	operation: ['getStatus'],
	resource: ['ai'],
};

export const aiGetStatusDescription: INodeProperties[] = [
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: { show: showOnlyForAiGetStatus },
		default: '',
		required: true,
		description: 'The ID of the file to check AI task status for',
	},
];
