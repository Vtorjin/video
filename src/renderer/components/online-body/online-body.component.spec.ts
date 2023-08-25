import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineBodyComponent } from './online-body.component';

describe('OnlineBodyComponent', () => {
  let component: OnlineBodyComponent;
  let fixture: ComponentFixture<OnlineBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineBodyComponent]
    });
    fixture = TestBed.createComponent(OnlineBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
