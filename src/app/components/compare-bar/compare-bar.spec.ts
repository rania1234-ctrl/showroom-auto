import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareBar } from './compare-bar';

describe('CompareBar', () => {
  let component: CompareBar;
  let fixture: ComponentFixture<CompareBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareBar],
    }).compileComponents();

    fixture = TestBed.createComponent(CompareBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
