/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MathSkillsService } from './math-skills.service';

describe('Service: MathSkills', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MathSkillsService]
    });
  });

  it('should ...', inject([MathSkillsService], (service: MathSkillsService) => {
    expect(service).toBeTruthy();
  }));
});
