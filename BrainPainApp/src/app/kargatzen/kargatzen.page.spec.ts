import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KargatzenPage } from './kargatzen.page';

describe('KargatzenPage', () => {
  let component: KargatzenPage;
  let fixture: ComponentFixture<KargatzenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KargatzenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KargatzenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
