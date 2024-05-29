import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotDisplayComponent } from './robot-display.component';

describe('RobotDisplayComponent', () => {
  let component: RobotDisplayComponent;
  let fixture: ComponentFixture<RobotDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotDisplayComponent]
    });
    fixture = TestBed.createComponent(RobotDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
