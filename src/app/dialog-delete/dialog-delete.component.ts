import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
// import { TranslateService } from '@ngx-translate/core';

import { TrapdestinationsService } from '../service/trapdestinations.service';
import { Trapdestinations } from '../trap-destinations';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css'],
  providers: [MessageService]
})
export class DialogDeleteComponent implements OnInit {
  display: boolean = false;
  // trapDes: Trapdestinations[] = [];
  @Input() dataInputDelete;
  @Output() myEmit = new EventEmitter<boolean>();
  constructor(
    private trapDestinationsService: TrapdestinationsService,
    private messageService: MessageService,
   ) { }

  ngOnInit() {
    this.showDialog();
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
    },
    () => {
      this.myEmit.emit(false);
    });
  }
}
