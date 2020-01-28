import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabPartidakPage } from './tabPartidak.page';

describe('TabPartidakPage', () => {
  let component: TabPartidakPage;
  let fixture: ComponentFixture<TabPartidakPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabPartidakPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabPartidakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
