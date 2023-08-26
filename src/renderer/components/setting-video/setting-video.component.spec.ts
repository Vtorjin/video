import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingVideoComponent } from './setting-video.component';

describe('SettingVideoComponent', () => {
  let component: SettingVideoComponent;
  let fixture: ComponentFixture<SettingVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingVideoComponent]
    });
    fixture = TestBed.createComponent(SettingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
