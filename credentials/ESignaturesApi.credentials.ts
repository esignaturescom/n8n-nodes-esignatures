import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ESignaturesApi implements ICredentialType {
	name = 'eSignaturesApi';
	displayName = 'eSignatures API';
	properties: INodeProperties[] = [
		{
			displayName: 'eSignatures API Secret Token',
			name: 'secretToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				token: '={{$credentials.secretToken}}'
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://esignatures.com',
			url: '/api/templates',
		},
	};
}
