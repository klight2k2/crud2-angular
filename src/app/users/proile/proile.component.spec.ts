import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProileComponent } from './proile.component';

describe('ProileComponent', () => {
  let component: ProileComponent;
  let fixture: ComponentFixture<ProileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
