import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberToProjectComponent } from './add-member-to-project.component';

describe('AddMemberToProjectComponent', () => {
  let component: AddMemberToProjectComponent;
  let fixture: ComponentFixture<AddMemberToProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberToProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
