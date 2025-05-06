import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PravyPanelComponent } from './pravy-panel.component';

describe('PravyPanelComponent', () => {
  let component: PravyPanelComponent;
  let fixture: ComponentFixture<PravyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PravyPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PravyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
