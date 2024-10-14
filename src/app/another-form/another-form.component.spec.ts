import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherFormComponent } from './another-form.component';

describe('AnotherFormComponent', () => {
  let component: AnotherFormComponent;
  let fixture: ComponentFixture<AnotherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotherFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
