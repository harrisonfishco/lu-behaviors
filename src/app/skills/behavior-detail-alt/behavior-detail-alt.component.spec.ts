import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorDetailAltComponent } from './behavior-detail-alt.component';

describe('BehaviorDetailAltComponent', () => {
  let component: BehaviorDetailAltComponent;
  let fixture: ComponentFixture<BehaviorDetailAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviorDetailAltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviorDetailAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
