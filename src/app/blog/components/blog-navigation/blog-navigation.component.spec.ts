import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogNavigationComponent } from './blog-navigation.component';

describe('BlogNavigationComponent', () => {
  let component: BlogNavigationComponent;
  let fixture: ComponentFixture<BlogNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
