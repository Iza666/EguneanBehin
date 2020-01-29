import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabTaldeakPage } from './tabTaldeak.page';

describe('TabTaldeakPage', () => {
  let component: TabTaldeakPage;
  let fixture: ComponentFixture<TabTaldeakPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabTaldeakPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabTaldeakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
