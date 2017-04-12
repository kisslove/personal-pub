/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FundBasicInfoService } from './fund-basic-info.service';

describe('Service: FundBasicInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundBasicInfoService]
    });
  });

  it('should ...', inject([FundBasicInfoService], (service: FundBasicInfoService) => {
    expect(service).toBeTruthy();
  }));
});