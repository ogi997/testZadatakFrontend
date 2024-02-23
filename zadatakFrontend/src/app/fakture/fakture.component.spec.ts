import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaktureComponent } from './fakture.component';

describe('FaktureComponent', () => {
  let component: FaktureComponent;
  let fixture: ComponentFixture<FaktureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaktureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaktureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
