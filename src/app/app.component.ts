import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ribbon VNF Manager';
  items: MenuItem[];
  data = [];
  constructor() { }
  ngOnInit() {
    this.items = [
      {
          label: 'sysadmin',
          items: [
            {label: 'About'},
            {label: 'Log out'}
          ]
      },
  ];
  }
}
