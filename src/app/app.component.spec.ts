import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { MenubarComponent } from './menubar/menubar.component';
import { RbnCommonLibModule } from 'rbn-common-lib';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';

xdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RbnCommonLibModule,
        PanelMenuModule,
        MenubarModule
      ],
      declarations: [
        AppComponent,
        MenubarComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should call func to init data on fuc ngOnInit', () => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let component = fixture.componentInstance;
  //   component.ngOnInit();
  //   let items = [
  //     {
  //         label: 'sysadmin',
  //         items: [
  //           {label: 'About'},
  //           {label: 'Log out'}
  //         ]
  //     },
  // ];
  // expect(component.items).toEqual(items);
  // });

  // it(`should have as title 'Ribbon VNF Manager'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Ribbon VNF Manager');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('Ribbon VNF Manager');
  // });
});
