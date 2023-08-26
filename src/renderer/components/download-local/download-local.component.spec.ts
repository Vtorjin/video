import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLocalComponent } from './download-local.component';

describe('DownloadLocalComponent', () => {
  let component: DownloadLocalComponent;
  let fixture: ComponentFixture<DownloadLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadLocalComponent]
    });
    fixture = TestBed.createComponent(DownloadLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
