import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingExecutejsComponent } from './setting-executejs.component';

describe('SettingExecutejsComponent', () => {
  let component: SettingExecutejsComponent;
  let fixture: ComponentFixture<SettingExecutejsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingExecutejsComponent]
    });
    fixture = TestBed.createComponent(SettingExecutejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
