import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSystemComponent } from './setting-system.component';

describe('SettingSystemComponent', () => {
  let component: SettingSystemComponent;
  let fixture: ComponentFixture<SettingSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingSystemComponent]
    });
    fixture = TestBed.createComponent(SettingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
