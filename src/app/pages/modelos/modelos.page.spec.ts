import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelosPage } from './modelos.page';

describe('ModelosPage', () => {
  let component: ModelosPage;
  let fixture: ComponentFixture<ModelosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModelosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
