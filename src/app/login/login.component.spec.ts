import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
import { AlertService} from 'client-my-channel-lib/src/components/alert/alert.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: any;
  let spyLoginService: any;
  let mockAlertService: any;
  let data: any;
  let loginInfo: any = {
    username: 'correct',
    password: '',
    macAddress: '',
    clientID: '',
    channelType: 'WEB'
  };
  beforeEach(async(() => {
    mockAlertService = {
      setpopupMessage: jasmine.createSpy('setpopupMessage').and.callThrough(),
      openPopup: jasmine.createSpy('openPopup')
    };
    mockLoginService = {
      getTokenID: (): void => {/**/}
    };
    spyLoginService = spyOn(mockLoginService, 'getTokenID');

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: LoginService, useValue: mockLoginService},
        {provide: AlertService, useValue: mockAlertService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should call LoginService getTokenID', fakeAsync(() => {
    spyLoginService.and.returnValue(
      new Promise((resolve: any, reject: any): void => {
        data = {
          resultCode: '20000',
          resultDesc: 'Success',
          developerMessage: 'Success',
          data: {
            // tslint:disable-next-line:max-line-length
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5leHR6eSIsInRpbWVzdGFtcCI6IjIwMTcwNTAyMTEzNyIsImxvY2F0aW9uQ29kZSI6IjExNzciLCJpYXQiOjE0OTM3MTM4NzIsImV4cCI6MTQ5NjMwNTg3Mn0.LRqHof2ITsQkvgdorpPaZu5J5rBukJpTWXUiPsHqC9o',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5leHR6eSIsInRpbWVzdGFtcCI6IjIwMTcwNTAyMTEzNyIsImxvY2F0aW9uQ29kZSI6IjExNzciLCJpYXQiOjE0OTM3MTM4NzIsImV4cCI6MTQ5NjMwNTg3Mn0.LRqHof2ITsQkvgdorpPaZu5J5rBukJpTWXUiPsHqC9o'
          }
        };
        resolve(data);
      })
    );
    component.login(loginInfo);
    fixture.detectChanges();
    expect(mockLoginService.getTokenID).toHaveBeenCalled();
  }));
  it('should call AlertService when reject', fakeAsync(() => {
    spyLoginService.and.returnValue(
      new Promise((resolve: any, reject: any): void => {
        reject({
          _body: '{"resultDescription": "Error"}'
        });
      })
    );
    component.login(loginInfo);
    fixture.detectChanges();
    expect(mockLoginService.getTokenID).toHaveBeenCalled();
  }));
});
