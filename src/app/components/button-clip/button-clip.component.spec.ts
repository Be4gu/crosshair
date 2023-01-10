import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonClipComponent } from './button-clip.component';

describe('ButtonClipComponent', () => {
  let component: ButtonClipComponent;
  let fixture: ComponentFixture<ButtonClipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonClipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
