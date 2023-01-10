import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirasComponent } from './miras.component';

describe('MirasComponent', () => {
  let component: MirasComponent;
  let fixture: ComponentFixture<MirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MirasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
