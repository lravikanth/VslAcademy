/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditDomainComponent } from './edit-domain.component';

describe('EditDomainComponent', () => {
  let component: EditDomainComponent;
  let fixture: ComponentFixture<EditDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
