import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { TrapdestinationsService } from './trapdestinations.service';

describe('TrapdestinationsService', () => {
  const appService = jasmine.createSpyObj('appService', ['get', 'post', 'put', 'delete']);
  let service: TrapdestinationsService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: appService }],
    })
  );

  beforeEach(() => {
    appService.get.and.returnValue(
      of({
        status: 200,
      })
    );
    service = TestBed.get(TrapdestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of trap destination', () => {
    appService.get.and.returnValue(of({ list: [] }));
    service.getAll().subscribe(res => {
      expect(res.list).toEqual([]);
    });
  });

  it('should return list of trap destination', () => {
    appService.get.and.returnValue(of({ list: [] }));
    service.getData('id').subscribe(res => {
      expect(res.list).toEqual([]);
    });
  });

  it('should  update the trap destination', () => {
    appService.put.and.returnValue(of(true));
    service.update('data', 'id').subscribe(res => {
      expect(res).toBeTruthy();
    });
  });

  it('should add a trap destination', () => {
    appService.post.and.returnValue(of(true));
    service.add('').subscribe(res => {
      expect(res).toBeTruthy();
    });
  });

  it('should delete a trap destination', () => {
    appService.delete.and.returnValue(of(true));
    service.delete('id').subscribe(res => {
      expect(res).toBeTruthy();
    });
  });
});
