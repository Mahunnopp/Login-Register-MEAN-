import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwindowComponent } from './loginwindow.component';

describe('LoginwindowComponent', () => {
  let component: LoginwindowComponent;
  let fixture: ComponentFixture<LoginwindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginwindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
