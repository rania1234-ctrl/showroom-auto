import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeasingSimulator } from './leasing-simulator';

describe('LeasingSimulator', () => {
  let component: LeasingSimulator;
  let fixture: ComponentFixture<LeasingSimulator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeasingSimulator],
    }).compileComponents();

    fixture = TestBed.createComponent(LeasingSimulator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
