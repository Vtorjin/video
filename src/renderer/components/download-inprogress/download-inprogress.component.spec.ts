import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInprogressComponent } from './download-inprogress.component';

describe('DownloadInprogressComponent', () => {
  let component: DownloadInprogressComponent;
  let fixture: ComponentFixture<DownloadInprogressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadInprogressComponent]
    });
    fixture = TestBed.createComponent(DownloadInprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
