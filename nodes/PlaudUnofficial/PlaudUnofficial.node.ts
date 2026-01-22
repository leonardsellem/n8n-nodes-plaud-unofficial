import {
	NodeConnectionTypes,
	type IDataObject,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type IHttpRequestMethods,
} from 'n8n-workflow';
import { fileDescription } from './resources/file';
import { folderDescription } from './resources/folder';
import { aiDescription } from './resources/ai';
import { shareDescription } from './resources/share';

export class PlaudUnofficial implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Plaud Unofficial',
		name: 'plaudUnofficial',
		icon: { light: 'file:plaudUnofficial.svg', dark: 'file:plaudUnofficial.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Plaud Unofficial API',
		defaults: {
			name: 'Plaud Unofficial',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'plaudUnofficialApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api-euc1.plaud.ai',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'File',
						value: 'file',
					},
					{
						name: 'Folder',
						value: 'folder',
					},
					{
						name: 'AI',
						value: 'ai',
					},
					{
						name: 'Share',
						value: 'share',
					},
				],
				default: 'file',
			},
			...fileDescription,
			...folderDescription,
			...aiDescription,
			...shareDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const baseUrl = 'https://api-euc1.plaud.ai';

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: unknown;

				// FILE RESOURCE
				if (resource === 'file') {
					if (operation === 'getAll') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'GET' as IHttpRequestMethods,
								url: `${baseUrl}/file/simple/web`,
								json: true,
							},
						);
						responseData = (response as { data_file_list?: unknown }).data_file_list || [];
					} else if (operation === 'get') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'GET' as IHttpRequestMethods,
								url: `${baseUrl}/file/detail/${fileId}`,
								json: true,
							},
						);
						responseData = (response as { data?: unknown }).data || response;
					} else if (operation === 'download') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'GET' as IHttpRequestMethods,
								url: `${baseUrl}/file/download/${fileId}`,
								encoding: 'arraybuffer',
								returnFullResponse: true,
							},
						);

						const binaryData = await this.helpers.prepareBinaryData(
							response.body as Buffer,
							`${fileId}.mp3`,
							'audio/mpeg',
						);

						returnData.push({
							json: { fileId },
							binary: {
								[binaryPropertyName]: binaryData,
							},
						});
						continue;
					} else if (operation === 'getBatch') {
						const fileIdsString = this.getNodeParameter('fileIds', i) as string;
						const fileIds = fileIdsString.split(',').map((id) => id.trim());
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'POST' as IHttpRequestMethods,
								url: `${baseUrl}/file/list`,
								body: { file_ids: fileIds },
								json: true,
							},
						);
						responseData = (response as { data?: unknown }).data || response;
					}
				}

				// FOLDER RESOURCE
				else if (resource === 'folder') {
					if (operation === 'getAll') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'GET' as IHttpRequestMethods,
								url: `${baseUrl}/filetag/`,
								json: true,
							},
						);
						responseData = (response as { data?: unknown }).data || response;
					}
				}

				// AI RESOURCE
				else if (resource === 'ai') {
					if (operation === 'getStatus') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'GET' as IHttpRequestMethods,
								url: `${baseUrl}/ai/file-task-status`,
								qs: { file_id: fileId },
								json: true,
							},
						);
						responseData = (response as { data?: unknown }).data || response;
					} else if (operation === 'getNotes') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'GET' as IHttpRequestMethods,
								url: `${baseUrl}/ai/query_note`,
								qs: { file_id: fileId },
								json: true,
							},
						);
						responseData = (response as { data?: unknown }).data || response;
					} else if (operation === 'getQuestions') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'POST' as IHttpRequestMethods,
								url: `${baseUrl}/ask/recommend_questions`,
								body: { file_id: fileId },
								json: true,
							},
						);
						responseData = (response as { data?: unknown }).data || response;
					}
				}

				// SHARE RESOURCE
				else if (resource === 'share') {
					if (operation === 'getPrivate') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'POST' as IHttpRequestMethods,
								url: `${baseUrl}/share/private/get`,
								body: { file_id: fileId },
								json: true,
							},
						);
						responseData = (response as { data?: unknown }).data || response;
					} else if (operation === 'getPublic') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'plaudUnofficialApi',
							{
								method: 'POST' as IHttpRequestMethods,
								url: `${baseUrl}/share/public/get`,
								body: { file_id: fileId },
								json: true,
							},
						);
						responseData = (response as { data?: unknown }).data || response;
					}
				}

				// Handle array responses
				if (Array.isArray(responseData)) {
					for (const item of responseData) {
						returnData.push({ json: item as IDataObject });
					}
				} else if (responseData !== undefined) {
					returnData.push({ json: responseData as IDataObject });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
