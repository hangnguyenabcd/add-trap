import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api'

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
  trapDes: Trapdestinations[] = [];
  @Input() DataInputdelete ;
  @Output() Myemit = new EventEmitter<boolean>();
  constructor(private trapDestinationsService: TrapdestinationsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.showDialog();
  }
  showDialog() {
    this.display = true;
  }
  deleteFromDb() {
    this.display = false;
    this.Myemit.emit(false);
  }
  onClick(){
    this.Myemit.emit(false);
  }
}
