import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RarezaComponent } from './rareza.component';

describe('RarezaComponent', () => {
  let component: RarezaComponent;
  let fixture: ComponentFixture<RarezaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RarezaComponent]
    });
    fixture = TestBed.createComponent(RarezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
