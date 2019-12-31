import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { throwError, of } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RbnCommonLibModule, HttpLoaderFactory } from 'rbn-common-lib';

import { DialogDeleteComponent } from './dialog-delete.component';
import { TrapdestinationsService } from '../service/trapdestinations.service'
describe('DialogDeleteComponent', () => {
  let component: DialogDeleteComponent;
  let fixture: ComponentFixture<DialogDeleteComponent>;
  let translateSevice: TranslateService | undefined;
  let http: HttpTestingController | undefined;
  const trapService = jasmine.createSpyObj('trapService', ['delete']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteComponent ],
      imports: [
        RbnCommonLibModule,
        DialogModule,
        ButtonModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        HttpClientTestingModule
      ],
      providers: [
        { provide: TrapdestinationsService, useValue: trapService },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    translateSevice = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
    if (http) {
      http.expectOne('./assets/i18n/en.json').flush({
        ADMIN: {
          ADD_USER: 'Add User',
          USERS: 'Users',
          ROLE: 'Role',
          USERNAME: 'Username',
          TRAP_DESTINATIONS: {
            NAME: 'name'
          }
        },
      });
      http.expectOne('./assets/i18n/rbn_en.json').flush({
        COMMON: {
          CLEAR: 'Clear Table',
          REFRESH: 'Refresh Table',
          SEARCH: 'Search',
          RECORDS_FOUND: 'records found',
          RECORD_FOUND: 'record found',
          NO_RECORDS: 'No records found',
          SHOW_COLUMN: 'Show Columns',
          CLOSE: 'Close',
          DELETE: 'Delete',
          SHOWHIDECOLUMNS: 'Show/Hide Columns',
        },
      });
    }
    if (translateSevice) {
      translateSevice.addLangs(['en']);
      translateSevice.setDefaultLang('en');
    }
    fixture = TestBed.createComponent(DialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoul emit with false on delete', () => {
    spyOn(component.myEmit, 'emit');
    component.dataInputDelete = {id: 'id'};
    trapService.delete.and.returnValue(throwError({ error: { message: 'Error message' } }));
    component.onClick();
    expect(component.myEmit.emit).toHaveBeenCalledWith(false);
  });

  it('shoul emit with true on delete', () => {
    spyOn(component.myEmit, 'emit');
    component.dataInputDelete = {id: 'id'};
    trapService.delete.and.returnValue(of({status: 200}));
    component.onClick();
    expect(component.myEmit.emit).toHaveBeenCalledWith(true);
  });

  it('should emit with false on closeDialog', () => {
    spyOn(component.myEmit, 'emit');
    component.cancelFromDb();
    expect(component.myEmit.emit).toHaveBeenCalledWith(false);
  });
});
