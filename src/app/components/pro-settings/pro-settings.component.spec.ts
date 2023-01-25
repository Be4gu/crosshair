import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProSettingsComponent } from './pro-settings.component';

describe('ProSettingsComponent', () => {
  let component: ProSettingsComponent;
  let fixture: ComponentFixture<ProSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
