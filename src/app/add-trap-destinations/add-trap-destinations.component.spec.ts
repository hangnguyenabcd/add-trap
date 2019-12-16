import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrapDestinationsComponent } from './add-trap-destinations.component';

describe('AddTrapDestinationsComponent', () => {
  let component: AddTrapDestinationsComponent;
  let fixture: ComponentFixture<AddTrapDestinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrapDestinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrapDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
