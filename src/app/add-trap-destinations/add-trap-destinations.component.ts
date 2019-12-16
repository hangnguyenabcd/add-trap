import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
  authenticationProtocol:  SelectItem[];
  privacyProtocol: SelectItem[];

  description: string;
  versionV3: boolean;
  authenticationV3 = false;
  privacyV3 = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit() {
    this.items = [
      { label: 'Trap Forwarding' },
      { label: 'Add Trap Destination' }
    ];
    this.userform = this.fb.group({
      'destination': new FormControl('', Validators.required),
      'ipaddress': new FormControl('', Validators.required),
      'portnumber': new FormControl('', Validators.required),
      'community': new FormControl('', Validators.required),
      'version': new FormControl('', Validators.required),
      // 'engine': new FormControl('', Validators.required),
      // 'v3user': new FormControl('', Validators.required),
      // 'authentication': new FormControl('', Validators.required),
      // 'authenticationPassphrase': new FormControl('', Validators.required),
      // 'authenticationProtocol': new FormControl('', Validators.required),
      // 'privacy': new FormControl('', Validators.required),
      // 'privacyPassphrase': new FormControl('', Validators.required),
      // 'privacyProtocol': new FormControl('', Validators.required),

    });
    this.trapversion = [];
    this.trapversion.push({ label: 'Select Version', value: '' });
    this.trapversion.push({ label: 'V2', value: 'v2' });
    this.trapversion.push({ label: 'V3', value: 'versionV3' });

    this.authenticationProtocol = [];
    this.authenticationProtocol.push({ label: 'MD5', value: 'md5' });
    this.authenticationProtocol.push({ label: 'SHA', value: 'sha' });

    this.privacyProtocol = [];
    this.privacyProtocol.push({ label: 'Select Privacy Protocol', value: '' });
    this.privacyProtocol.push({ label: 'V2', value: 'v2' });
    this.privacyProtocol.push({ label: 'V3', value: 'versionV3' });

    this.userform.valueChanges.subscribe(data => {
      if (this.userform.get('version').value === 'versionV3') {
      this.userform.get('authentication').setValidators([Validators.required]);
      this.userform.get('privacy').setValidators([Validators.required])
      }
      console.log(this.userform.get('version').value);
      // if (this.form.controls.name.errors)
      // console.log(this.form.controls.ip.errors);
      console.log(data);
      })
  }
  onSubmit(value) {
    this.submitted = true;
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted', sticky: true });
    console.log(this.userform);
  }
  handleV3() {
    if (this.userform.get('version').value == 'versionV3') {
      this.versionV3 = true;
      } else {
      this.versionV3 = false;
      }

  }
  handleAuthentication(){
    if (this.userform.get('authentication').value ) {
      this.authenticationV3 = true;
      } else {
      this.authenticationV3 = false;
      }
  }
  handlePrivacy(){
    if (this.userform.get('privacy').value) {
      this.privacyV3 = true;
      } else {
      this.privacyV3 = false;
      }
  }
}
