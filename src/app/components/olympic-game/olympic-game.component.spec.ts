import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicGameComponent } from './olympic-game.component';

describe('OlympicGameComponent', () => {
  let component: OlympicGameComponent;
  let fixture: ComponentFixture<OlympicGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
