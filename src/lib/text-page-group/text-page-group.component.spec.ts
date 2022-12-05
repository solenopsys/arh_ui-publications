import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPageGroupComponent } from './text-page-group.component';

describe('TextPageGroupComponent', () => {
  let component: TextPageGroupComponent;
  let fixture: ComponentFixture<TextPageGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextPageGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
