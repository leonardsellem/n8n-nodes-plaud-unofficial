import type { INodeProperties } from 'n8n-workflow';
import { aiGetStatusDescription } from './getStatus';
import { aiGetNotesDescription } from './getNotes';
import { aiGetQuestionsDescription } from './getQuestions';

const showOnlyForAi = {
	resource: ['ai'],
};

export const aiDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAi,
		},
		options: [
			{
				name: 'Get Status',
				value: 'getStatus',
				action: 'Get AI task status',
				description: 'Get the status of AI processing for a file',
				routing: {
					request: {
						method: 'GET',
						url: '/ai/file-task-status',
						qs: {
							file_id: '={{$parameter.fileId}}',
						},
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
				name: 'Get Notes',
				value: 'getNotes',
				action: 'Get AI notes',
				description: 'Get AI-generated notes for a file',
				routing: {
					request: {
						method: 'GET',
						url: '/ai/query_note',
						qs: {
							file_id: '={{$parameter.fileId}}',
						},
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
				name: 'Get Questions',
				value: 'getQuestions',
				action: 'Get recommended questions',
				description: 'Get AI-recommended questions for a file',
				routing: {
					request: {
						method: 'POST',
						url: '/ask/recommend_questions',
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
		default: 'getStatus',
	},
	...aiGetStatusDescription,
	...aiGetNotesDescription,
	...aiGetQuestionsDescription,
];
