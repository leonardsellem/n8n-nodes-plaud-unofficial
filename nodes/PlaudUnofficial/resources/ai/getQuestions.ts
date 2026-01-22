import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAiGetQuestions = {
	operation: ['getQuestions'],
	resource: ['ai'],
};

export const aiGetQuestionsDescription: INodeProperties[] = [
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: { show: showOnlyForAiGetQuestions },
		default: '',
		required: true,
		description: 'The ID of the file to get recommended questions for',
	},
];
