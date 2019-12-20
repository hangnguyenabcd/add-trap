import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TrapdestinationsService } from '../service/trapdestinations.service';
import { SHOWTITLEADD, SHOWTITLEEDIT } from '../config/constanst'
import { Trapdestinations } from '../trap-destinations';

@Component({
	selector: 'app-add-trap-destinations',
	templateUrl: './add-trap-destinations.component.html',
	styleUrls: ['./add-trap-destinations.component.css']
})
export class AddTrapDestinationsComponent implements OnInit {
	userform: FormGroup;

	private add: MenuItem[] = SHOWTITLEADD;
	private edit: MenuItem[] = SHOWTITLEEDIT;
	trapversion: SelectItem[];
	authenticationProtocol: SelectItem[];
	privacyProtocol: SelectItem[];

	description: string;
	V3 = false;
	authenticationV3 = false;
	privacyV3 = false;
	submitted: boolean;
	titleForm = SHOWTITLEADD[1].label;
	private isAddForm: boolean = true;

	private editItem: Trapdestinations;
	constructor(
		private fb: FormBuilder,
		private messageService: MessageService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private service: TrapdestinationsService) {
	}

	ngOnInit() {
		this.createForm();
		const editId = +this.route.snapshot.paramMap.get('id')
		if (editId != 0) {
			this.add = SHOWTITLEEDIT;
			this.titleForm = SHOWTITLEEDIT[1].label;
			this.isAddForm = false;
			this.service.getData(editId).subscribe((data: Trapdestinations) => {
				this.editItem = data;
				this.setControlsValue([
					{ name: 'status', value: data.status },
					{ name: 'destinationName', value: data.destinationName },
					{ name: 'ipAddress', value: data.ipAddress },
					{ name: 'portNumber', value: data.portNumber },
					{ name: 'community', value: data.community },
					{ name: 'version', value: data.version },
				])

				if (data.version == 'V3') {
					this.enableVersionV3(true);
					this.setControlsValue([
						{ name: 'engine', value: data.engine },
						{ name: 'v3user', value: data.v3user },
					])
				}

				if (data.authenticationPassphrase != undefined) {
					this.enableAutForm(true)
					this.setControlsValue([
						{ name: 'authentication', value: true },
						{ name: 'authenticationPassphrase', value: data.authenticationPassphrase },
						{ name: 'authenticationProtocol', value: data.authenticationProtocol },
					])
				}

				if (data.privacyPassphrase != undefined) {
					this.enablePrivacyForm(true);
					this.setControlsValue([
						{ name: 'privacy', value: true },
						{ name: 'privacyPassphrase', value: data.privacyPassphrase },
						{ name: 'privacyProtocol', value: data.privacyProtocol },
					])
				}
			})
		}
	}

	createForm() {
		this.userform = this.fb.group({
			'destinationName': new FormControl('', Validators.required),
			'ipAddress': new FormControl('', [Validators.required, Validators.pattern('((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))')]),
			'portNumber': new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]),
			'community': new FormControl('', Validators.required),
			'version': new FormControl('', Validators.required),
			'engine': new FormControl(''),
			'v3user': new FormControl(''),
			'authentication': new FormControl(''),
			'authenticationPassphrase': new FormControl(''),
			'authenticationProtocol': new FormControl(''),
			'privacy': new FormControl(''),
			'privacyPassphrase': new FormControl(''),
			'privacyProtocol': new FormControl(''),
			'status': new FormControl(''),
		});

		this.trapversion = [];
		this.trapversion.push({ label: 'Select Version', value: '' });
		this.trapversion.push({ label: 'V2', value: 'V2' });
		this.trapversion.push({ label: 'V3', value: 'V3' });

		this.authenticationProtocol = [];
		this.authenticationProtocol.push({ label: 'MD5', value: 'md5' });
		this.authenticationProtocol.push({ label: 'SHA', value: 'sha' });

		this.privacyProtocol = [];
		this.privacyProtocol.push({ label: 'Select Privacy Protocol', value: '' });
		this.privacyProtocol.push({ label: 'V2', value: 'V2' });
		this.privacyProtocol.push({ label: 'V3', value: 'V3' });

		this.userform.valueChanges.subscribe(data => {
		})
	}

	onSubmit() {
		this.submitted = true;
		if (this.userform.valid) {
			if (this.isAddForm) {
				this.service.add(this.userform.value).subscribe(res => {
					this.messageService.add({severity: 'info', summary: 'Info', detail: 'Snmp Destination \'' + this.userform.get('destinationName').value +'\' has been added from VNFM.'});
					this.router.navigate(['/home']);
				})
			} else {
				this.service.update(this.editItem.id, this.userform.value).subscribe(res => {
					this.messageService.add({severity: 'info', summary: 'Info', detail: 'Snmp Destination \''+ this.userform.get('destinationName').value +'\' has been updated from VNFM.'});
					this.router.navigate(['/home']);
				})
			}

		}
	}

	onCancel() {
		this.location.back();
	}

	handleV3() {
		this.userform.get('version').value == 'V3' ? this.enableVersionV3(true) : this.enableVersionV3(false)
	}

	handleAuthentication() {
		this.userform.get('authentication').value ? this.enableAutForm(true) : this.enableAutForm(false);
	}

	handlePrivacy() {
		this.userform.get('privacy').value ? this.enablePrivacyForm(true) : this.enablePrivacyForm(false);
	}

	enableVersionV3(enable) {
		if (enable) {
			this.V3 = true;
			this.setControlsValidators([
				{ name: 'engine', validators: [Validators.required] },
				{ name: 'v3user', validators: [Validators.required] },
			])
		} else {
			this.V3 = false;
			this.enableAutForm(false);
			this.enablePrivacyForm(false);
			this.resetControls(['engine', 'v3user', 'authentication', 'privacy'])
		}
	}

	enableAutForm(enable) {
		if (enable) {
			this.authenticationV3 = true;
			this.setControlsValidators([
				{ name: 'authenticationPassphrase', validators: [Validators.required] },
			])
		} else {
			this.authenticationV3 = false;
			this.resetControls(['authenticationPassphrase', 'authenticationProtocol'])
		}
	}

	enablePrivacyForm(enable) {
		if (enable) {
			this.privacyV3 = true;
			this.setControlsValidators([
				{ name: 'privacyPassphrase', validators: [Validators.required] },
			])
		} else {
			this.privacyV3 = false;
			this.resetControls(['privacyPassphrase', 'privacyProtocol'])
		}
	}

	resetControls(controls: string[]) {
		controls.forEach(control => {
			this.userform.get(control).reset();
			this.userform.get(control).clearValidators();
			this.userform.get(control).updateValueAndValidity();
		});
	}
	setControlsValue(controls: any[]) {
		controls.forEach(control => {
			this.userform.get(control.name).setValue(control.value);
		});
	}
	setControlsValidators(controls: any[]) {
		controls.forEach(control => {
			this.userform.get(control.name).setValidators(control.validators);
			this.userform.get(control.name).updateValueAndValidity();
		});
	}
}


