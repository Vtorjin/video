import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingOtherComponent } from './setting-other.component';

describe('SettingOtherComponent', () => {
  let component: SettingOtherComponent;
  let fixture: ComponentFixture<SettingOtherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingOtherComponent]
    });
    fixture = TestBed.createComponent(SettingOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
