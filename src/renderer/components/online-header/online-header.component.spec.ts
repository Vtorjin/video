import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineHeaderComponent } from './online-header.component';

describe('OnlineHeaderComponent', () => {
  let component: OnlineHeaderComponent;
  let fixture: ComponentFixture<OnlineHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineHeaderComponent]
    });
    fixture = TestBed.createComponent(OnlineHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
