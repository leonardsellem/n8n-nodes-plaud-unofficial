import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFileDownload = {
	operation: ['download'],
	resource: ['file'],
};

export const fileDownloadDescription: INodeProperties[] = [
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: { show: showOnlyForFileDownload },
		default: '',
		required: true,
		description: 'The ID of the file to download',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		displayOptions: { show: showOnlyForFileDownload },
		default: 'data',
		description: 'Name of the binary property to write the audio file to',
	},
];
