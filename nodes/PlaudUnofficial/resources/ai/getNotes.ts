import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAiGetNotes = {
	operation: ['getNotes'],
	resource: ['ai'],
};

export const aiGetNotesDescription: INodeProperties[] = [
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: { show: showOnlyForAiGetNotes },
		default: '',
		required: true,
		description: 'The ID of the file to get AI notes for',
	},
];
