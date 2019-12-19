import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'

import { TrapdestinationsService } from '../service/trapdestinations.service';
import { Trapdestinations } from '../trap-destinations';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css'],
  providers: [MessageService]
})
export class DialogDeleteComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  display: boolean = false;
  trapDes: Trapdestinations[] = [];
  @Input() dataInputDelete;
  @Output() myEmit = new EventEmitter<boolean>();
  constructor(
    private trapDestinationsService: TrapdestinationsService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    console.log('ngOnChanges()');
    this.showDialog();
  }
  ngOnChanges() {
    console.log('ngOnChanges()');
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
  showDialog() {
    this.display = true;
  }
  cancelFromDb() {
    this.display = false;
    this.myEmit.emit(false);
  }
  onClick() {
    this.trapDestinationsService.delete(this.dataInputDelete.id).subscribe(res => {
      this.myEmit.emit(true);
    });
  }
}
