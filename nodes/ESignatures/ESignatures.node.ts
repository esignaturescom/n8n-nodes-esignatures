import {
	IExecuteFunctions
} from 'n8n-workflow';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {contractFields, contractOperations} from "./ContractDescription";

export class ESignatures implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'eSignatures',
		name: 'eSignatures',
		icon: 'file:esignatures-logo-20240205.svg',
		group: ['transform'],
		version: 1,
		description: 'eSignatures API',
		defaults: {
			name: 'ESignatures',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'eSignaturesApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Contract',
						value: 'contract',
					},
				],
				default: 'contract',
				noDataExpression: true,
				required: true,
				description: 'Create a new contract',
			},
			...contractOperations,
			...contractFields,
		]
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const templateId = this.getNodeParameter('templateId', 0) as string;
		const signers = this.getNodeParameter('signers', 0) as {signer: {name: string; email: string, mobile: string, company_name: string, redirect_url: string, signing_order: number, auto_sign: boolean}[]};

		const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;
		const test = additionalFields && additionalFields.test ? "yes" : "no"
		const saveAsDraft = additionalFields && additionalFields.saveAsDraft ? "yes" : "no"
		const assignedUserEmail = additionalFields && additionalFields.assignedUserEmail
		const title = additionalFields && additionalFields.title
		const locale = additionalFields && additionalFields.locale
		const labels = additionalFields && additionalFields.labels && (additionalFields.labels as { label: { value: string }[] }).label.map(l => l.value);
		const placeholderFields = additionalFields && additionalFields.placeholderFields as {placeholderField: {api_key: string, value: string}[]};
		const emails = additionalFields && additionalFields.emails as { emailSettings: {signature_request_subject: string; signature_request_text: string; final_contract_subject: string; final_contract_text: string; reply_to: string}};
		const custom_branding = additionalFields && additionalFields.custom_branding as { brandingSettings: {company_name: string, logo_url: string}}


		// For each item, make an API call to create a contract
		if (resource == 'contract' && operation === 'create') {
			const data: IDataObject = {
				contract_source: "n8n",
				template_id: templateId,
				signers: signers && signers.signer,
				save_as_draft: saveAsDraft,
				assigned_user_email: assignedUserEmail,
				title: title,
				test: test,
				locale: locale,
				labels: labels,
				placeholder_fields: placeholderFields && placeholderFields.placeholderField,
				emails: emails && emails.emailSettings,
				custom_branding: custom_branding && custom_branding.brandingSettings,
			};

			// Make HTTP request according to https://esignatures.com/docs/api
			responseData = await this.helpers.requestWithAuthentication.call(this, 'eSignaturesApi', {
				headers: {'Accept': 'application/json'},
				method: 'POST',
				body: data,
				uri: `https://esignatures.com/api/contracts`,
				json: true,
			});
		}

		// Map data to n8n data structure
		return [this.helpers.returnJsonArray([responseData])];
	}
}
