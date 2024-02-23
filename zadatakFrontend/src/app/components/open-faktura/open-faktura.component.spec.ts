import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFakturaComponent } from './open-faktura.component';

describe('OpenFakturaComponent', () => {
  let component: OpenFakturaComponent;
  let fixture: ComponentFixture<OpenFakturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenFakturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenFakturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
