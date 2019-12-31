import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { of, from } from 'rxjs';
import { HttpLoaderFactory, RbnCommonLibModule, FilterTypes, RbnMessageService } from 'rbn-common-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { TrapDestinationsComponent } from './trap-destinations.component';
import { TrapdestinationsService } from '../service/trapdestinations.service';

describe('TrapDestinationsComponent', () => {
  let component: TrapDestinationsComponent;
  let fixture: ComponentFixture<TrapDestinationsComponent>;
  let translateSevice: TranslateService | undefined;
  let http: HttpTestingController | undefined;
  const trapService = jasmine.createSpyObj('trapService', ['getAll']);
  const router = { navigate: jasmine.createSpy('navigate') };
  const MsgService = jasmine.createSpyObj('MsgService', ['clear','add']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RbnCommonLibModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        HttpClientTestingModule
      ],
      declarations: [ TrapDestinationsComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: MessageService, useValue: MsgService },
        { provide: TrapdestinationsService, useValue: trapService },
        { provide: Router, useValue: router },
        { provide: APP_BASE_HREF, useValue: '/' },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    translateSevice = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
    if (http) {
      http.expectOne('./assets/i18n/en.json').flush({
        // ADMIN: {
        //   TRAP_DESTINATIONS: {
        //     NAME: 'name'
        //   }
        // },
      });
      http.expectOne('./assets/i18n/rbn_en.json').flush({
        // COMMON: {
        //   CLEAR: 'Clear Table',
        //   REFRESH: 'Refresh Table',
        //   SEARCH: 'Search',
        //   RECORDS_FOUND: 'records found',
        //   RECORD_FOUND: 'record found',
        //   NO_RECORDS: 'No records found',
        //   SHOW_COLUMN: 'Show Columns',
        //   CLOSE: 'Close',
        //   DELETE: 'Delete',
        //   SHOWHIDECOLUMNS: 'Show/Hide Columns',
        // },
      });
    }
    if (translateSevice) {
      translateSevice.addLangs(['en']);
      translateSevice.setDefaultLang('en');
    }
    fixture = TestBed.createComponent(TrapDestinationsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    trapService.getAll.and.returnValue(of(
      {
        data: [
          {name: 'name', enabled: true},
          {name: 'name2', enabled: false},
        ]
      }
    ));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call func to init data on fuc ngOnInit', () => {
    spyOn(component, 'getAll');
    component.ngOnInit();
    expect(component.getAll).toHaveBeenCalled();
  });

  it('should call getAll when refreshData', () => {
    spyOn(component, 'getAll');
    component.refreshData();
    expect(component.getAll).toHaveBeenCalled();
  });

  it('should set isShowDialogDelete = true on showDeleteDialog', () => {
    component.showDeleteDialog(null, 'data');
    expect(component.isShowDialogDelete).toBeTruthy();
    expect(component.dataInputDelete).toEqual('data');
  });

  it('shoul set isShowDialogDelete = false on setIsShowConrfirm', () => {
    component.setIsShowConrfirm(false);
    expect(component.isShowDialogDelete).toBeFalsy();
    expect(component.dataInputDelete).toBeUndefined();
  });

  it('should call func getAll on setIsShowConrfirm with true', () => {
    spyOn(component, 'getAll');
    component.setIsShowConrfirm(true);
    expect(component.getAll).toHaveBeenCalled();
  });

  // xit('should set isShowDialogDelete = true when call func onLinkClick', () => {
  //   const dataInputDelete: any = ['123'];
  //   component.onLinkClick(dataInputDelete);
  //   expect(router.navigate).toHaveBeenCalledWith(['/edit','123']);
  // });

  it('should set isShowDialogDelete = true when call func addTrapDestination', () => {
    component.addTrapDestination();
    // expect(RouterTestingModule).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('call initDropdownData', () => {
    const data = [
      { data: 'test1' },
      { data: 'test2', type: FilterTypes.Multiselect }];
    component.initDropdownData(data);
    expect(data[1].data).toEqual([]);
  });

  it('MsgService should call clear on fn clearAll ', () => {
    // spyOn(MsgService, 'clear');
     component.clearAll();
     expect(MsgService.clear).toHaveBeenCalled();
   });


});

