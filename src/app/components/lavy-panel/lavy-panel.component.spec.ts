import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavyPanelComponent } from './lavy-panel.component';

describe('LavyPanelComponent', () => {
  let component: LavyPanelComponent;
  let fixture: ComponentFixture<LavyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LavyPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LavyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
