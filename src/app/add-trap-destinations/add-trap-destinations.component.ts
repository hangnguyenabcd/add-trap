import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TrapdestinationsService } from '../service/trapdestinations.service'

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-add-trap-destinations',
  templateUrl: './add-trap-destinations.component.html',
  styleUrls: ['./add-trap-destinations.component.css'],
  providers: [MessageService]
})
export class AddTrapDestinationsComponent implements OnInit {
  private items: MenuItem[];
  cities: City[];
  userform: FormGroup;

  submitted: boolean;

  trapversion: SelectItem[];
  authenticationProtocol: SelectItem[];
  privacyProtocol: SelectItem[];

  description: string;
  versionV3 = false;
  authenticationV3 = false;
  privacyV3 = false;
  private editItem: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private service: TrapdestinationsService) {
  }

  ngOnInit() {
    this.createForm();
    const id = +this.route.snapshot.paramMap.get('id')
    if (id != 0) {
      this.editItem = this.service.getData(id);
      this.userform.get('status').setValue(this.editItem.status);
      this.userform.get('destinationName').setValue(this.editItem.destinationName);
      this.userform.get('ipAddress').setValue(this.editItem.ipAddress);
      this.userform.get('portNumber').setValue(this.editItem.portNumber);
      this.userform.get('community').setValue(this.editItem.community);
      this.userform.get('version').setValue(this.editItem.version);

      if (this.editItem.version == 'V3') {
        this.enableVersionV3(true)
        this.userform.get('engine').setValue(this.editItem.engine)
        this.userform.get('v3user').setValue(this.editItem.v3user)
      }

      if (this.editItem.authenticationPassphrase != undefined) {
        this.enableAutForm(true)
        this.userform.get('authentication').setValue(true)
        this.userform.get('authenticationPassphrase').setValue(this.editItem.authenticationPassphrase);
        this.userform.get('authenticationProtocol').setValue(this.editItem.authenticationProtocol);
      }

      if (this.editItem.privacyPassphrase != undefined) {
        this.enablePrivacyForm(true);
        this.userform.get('privacy').setValue(true)
        this.userform.get('privacyPassphrase').setValue(this.editItem.privacyPassphrase);
        this.userform.get('privacyProtocol').setValue(this.editItem.privacyProtocol);
      }
    }

  }
  createForm() {
    this.items = [
      { label: 'Trap Forwarding', routerLink: '/home' },
      { label: 'Add Trap Destination' }
    ];
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
      console.log(this.userform);
    })
  }
  onSubmit() {
    console.warn(this.userform);
  }

  handleV3() {
    if (this.userform.get('version').value == 'V3') {
      this.enableVersionV3(true)
    } else {
      this.enableVersionV3(true)
    }
  }

  handleAuthentication() {
    if (this.userform.get('authentication').value) {
      this.enableAutForm(true);
    } else {
      this.enableAutForm(false);
    }
  }

  handlePrivacy() {
    if (this.userform.get('privacy').value) {
      this.enablePrivacyForm(true);
    } else {
      this.enablePrivacyForm(false);
    }
  }
  enableVersionV3(enable: boolean) {
    if (enable) {
      this.versionV3 = true;
      this.userform.get('engine').setValidators([Validators.required]); this.userform.get('engine').updateValueAndValidity();
      this.userform.get('v3user').setValidators([Validators.required]); this.userform.get('v3user').updateValueAndValidity();
    } else {
      this.versionV3 = false;
      this.enableAutForm(false);
      this.enablePrivacyForm(false);
      this.userform.get('engine').clearValidators(); this.userform.get('engine').updateValueAndValidity();
      this.userform.get('v3user').clearValidators(); this.userform.get('v3user').updateValueAndValidity();
      this.resetControls(['engine', 'v3user', 'authentication', 'privacy'])
    }
  }
  enableAutForm(enable: boolean) {
    if (enable) {
      this.authenticationV3 = true;
      this.userform.get('authenticationPassphrase').setValidators([Validators.required]); this.userform.get('authenticationPassphrase').updateValueAndValidity();
    } else {
      this.authenticationV3 = false;
      this.userform.get('authenticationPassphrase').clearValidators(); this.userform.get('authenticationPassphrase').updateValueAndValidity();
      this.resetControls(['authenticationPassphrase', 'authenticationProtocol'])
    }
  }
  enablePrivacyForm(enable: boolean) {
    if (enable) {
      this.privacyV3 = true;
      this.userform.get('privacyPassphrase').setValidators([Validators.required]); this.userform.get('privacyPassphrase').updateValueAndValidity();
    } else {
      this.privacyV3 = false;
      this.userform.get('privacyPassphrase').clearValidators();
      this.userform.get('privacyPassphrase').updateValueAndValidity();
      this.resetControls(['privacyPassphrase', 'privacyProtocol'])
    }
  }
  resetControls(controls: string[]) {
    controls.forEach(control => {
      this.userform.get(control).reset();
    });
  }
}


