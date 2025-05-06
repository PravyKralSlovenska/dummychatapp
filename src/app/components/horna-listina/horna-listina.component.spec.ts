import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HornaListinaComponent } from './horna-listina.component';

describe('HornaListinaComponent', () => {
  let component: HornaListinaComponent;
  let fixture: ComponentFixture<HornaListinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HornaListinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HornaListinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
