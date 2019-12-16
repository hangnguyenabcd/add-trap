import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrapDestinationsComponent } from './trap-destinations.component';

describe('TrapDestinationsComponent', () => {
  let component: TrapDestinationsComponent;
  let fixture: ComponentFixture<TrapDestinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrapDestinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrapDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
