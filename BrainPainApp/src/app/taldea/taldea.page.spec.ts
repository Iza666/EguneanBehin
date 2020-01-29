import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaldeaPage } from './taldea.page';

describe('TaldeaPage', () => {
  let component: TaldeaPage;
  let fixture: ComponentFixture<TaldeaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaldeaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaldeaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
