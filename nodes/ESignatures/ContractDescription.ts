import {
	INodeProperties
} from 'n8n-workflow';

export const contractOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'contract',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a contract',
				action: 'Create a contract',
			},
		],
		default: 'create',
		noDataExpression: true,
	},
]

export const contractFields: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		description: 'GUID of a mobile-friendly contract template within eSignatures. The template provides content, title, and labels.',
	},
	{
		displayName: 'Signers',
		name: 'signers',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true
		},
		default: {},
		description: 'List of individuals required to sign the contract. Only include specific persons with their contact details; do not add generic signers.',
		options: [
			{
				displayName: 'Signer',
				name: 'signer',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Signer\'s name',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
						description: 'Signer\'s email',
					},
					{
						displayName: 'Mobile',
						name: 'mobile',
						type: 'string',
						default: '',
						description: 'Signer\'s mobile number (E.123 format)',
					},
					{
						displayName: 'Company Name',
						name: 'company_name',
						type: 'string',
						default: '',
						description: 'Signer\'s company name',
					},
					{
						displayName: 'Redirect URL',
						name: 'redirect_url',
						type: 'string',
						default: '',
						description: 'URL for signer redirection post-signing',
					},
					{
						displayName: 'Signing Order',
						name: 'signing_order',
						type: 'number',
						default: undefined,
						description: "Order in which signers receive the contract; same number signers are notified together. By default, sequential.",
					},
					{
						displayName: 'Auto Sign',
						name: 'auto_sign',
						type: 'options',
						options: [
							{
								name: 'Yes',
								value: 'yes'
							},
							{
								name: 'No',
								value: 'no'
							}
						],
						default: 'no',
						description: 'Automatically signs document if \'yes\'; only for your signature not for other signers'
					}
				]
			}
		]
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'contract',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				displayName: 'Placeholder Fields',
				name: 'placeholderFields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true
				},
				default: {},
				description: 'Replaces text placeholders in templates when creating a contract. Example: {{interest_rate}}.',
				options: [
					{
						displayName: 'Field',
						name: 'placeholderField',
						values: [
							{
								displayName: 'API Key',
								name: 'api_key',
								type: 'string',
								default: '',
								description: 'The template\'s placeholder key, e.g., for {{interest_rate}}, api_key is \'interest_rate\''
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Text that replaces the placeholder. Newline character \\n start a new line.'
							}
						]
					}
				]
			},
			{
				displayName: 'Test Contract',
				description: 'Whether to mark the contract as "demo", which incurs no fees, adds a DEMO stamp, and disables reminders',
				name: 'test',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Save as Draft',
				description: "Whether to save the contract as a draft for further editing; once saved, the draft can be edited and sent via the UI. URL: https://esignatures.com/contracts/[contract_id]/edit, where contract_id is in the API response.",
				name: 'saveAsDraft',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Assigned User Email',
				description: "Assigns an eSignatures user as contract owner with edit/view/send rights and notification settings. Contract owners get email notifications for signings and full contract completion if enabled on their Profile.",
				name: 'assignedUserEmail',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Title',
				description: 'Sets the contract\'s title, which appears as the first line in contracts and PDF files, in email subjects, and overrides the template\'s title',
				name: 'title',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Language',
				name: 'locale',
				type: 'options',
				options: [
					{name: "Croatian", value: "hr"},
					{name: "Czech", value: "cz"},
					{name: "Danish", value: "de"},
					{name: "Dutch", value: "nl"},
					{name: "English", value: "en"},
					{name: "English (British)", value: "en-Gb"},
					{name: "French", value: "fr"},
					{name: "Hungarian", value: "hu"},
					{name: "Indonesian", value: "id"},
					{name: "Italian", value: "it"},
					{name: "Japanese", value: "ja"},
					{name: "Norwegian", value: "no"},
					{name: "Polish", value: "pl"},
					{name: "Portuguese", value: "pt"},
					{name: "Romanian", value: "ro"},
					{name: "Serbian", value: "rs"},
					{name: "Slovak", value: "sk"},
					{name: "Slovanian", value: "sl"},
					{name: "Spanish", value: "es"},
					{name: "Swedish", value: "sv"},
					{name: "Vietnamese", value: "vi"},
				],
				default: 'en',
				description: 'Language for signer page and emails'
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true
				},
				default: {},
				description: 'Assigns labels to the contract, overriding template labels. Labels assist in organizing contracts without using folders.',
				options: [
					{
						displayName: 'Label',
						name: 'label',
						values: [
							{
								displayName: 'Label',
								name: 'value',
								type: 'string',
								default: ''
							}
						]
					}
				]
			},
			{
				displayName: 'Emails',
				name: 'emails',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false
				},
				default: {},
				description: 'Customize email settings for signing and final documents',
				options: [
					{
						displayName: 'Email Settings',
						name: 'emailSettings',
						values: [
							{
								displayName: 'Signature Request Subject',
								name: 'signature_request_subject',
								type: 'string',
								default: '',
								description: 'Email subject for signature request emails'
							},
							{
								displayName: 'Signature Request Text',
								name: 'signature_request_text',
								type: 'string',
								default: '',
								typeOptions: {
									rows: 4
								},
								description: 'Email body of signature request email'
							},
							{
								displayName: 'Final Contract Subject',
								name: 'final_contract_subject',
								type: 'string',
								default: '',
								description: 'Email subject for the final contract email'
							},
							{
								displayName: 'Final Contract Text',
								name: 'final_contract_text',
								type: 'string',
								default: '',
								typeOptions: {
									rows: 4
								},
								description: 'Body of final contract email'
							},
							{
								displayName: 'Reply To',
								name: 'reply_to',
								type: 'string',
								default: '',
								description: 'Custom reply-to email address (defaults to support email if not set)'
							}
						]
					}
				]
			},
			{
				displayName: 'Custom Branding',
				name: 'custom_branding',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false
				},
				default: {},
				description: 'Customize branding for documents and emails',
				options: [
					{
						displayName: 'Branding Settings',
						name: 'brandingSettings',
						values: [
							{
								displayName: 'Company Name',
								name: 'company_name',
								type: 'string',
								default: '',
								description: 'Custom company name shown as the sender'
							},
							{
								displayName: 'Logo URL',
								name: 'logo_url',
								type: 'string',
								default: '',
								description: 'URL for custom logo (PNG, recommended 400px size)'
							},
						]
					}
				]
			}
		],
	},
]
