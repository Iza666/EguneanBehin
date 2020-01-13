import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GalderaPage } from './galdera.page';

describe('GalderaPage', () => {
  let component: GalderaPage;
  let fixture: ComponentFixture<GalderaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalderaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GalderaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
