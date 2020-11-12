import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleMassasComponent } from './controle-massas.component';

describe('ControleMassasComponent', () => {
  let component: ControleMassasComponent;
  let fixture: ComponentFixture<ControleMassasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleMassasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleMassasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
