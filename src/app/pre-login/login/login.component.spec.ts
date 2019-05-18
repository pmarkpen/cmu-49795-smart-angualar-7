import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { PreLoginModule } from '../pre-login.module';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService, LogInStoreResponse } from './login.service';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { StoreInformationService } from '../../shared-service/store-information.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: Router;
  let storeInformationService: StoreInformationService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]),
        PreLoginModule,
        HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.get(LoginService);
    router = TestBed.get(Router);
    storeInformationService = TestBed.get(StoreInformationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("onClickLogin", () => {
    describe("when users are store owners", () => {
      beforeEach(() => {
        component.isStore = true;
      });

      describe("when the logInForm is not valid", () => {
        it("should do nothing", () => {
          spyOn(loginService, "loginAsStore").and.returnValue(of({} as LogInStoreResponse));
          component.loginForm.controls["email"].setValue("");
          component.loginForm.controls["password"].setValue("");

          component.onClickLogin();
          expect(loginService.loginAsStore).not.toHaveBeenCalled();
        });
      });

      describe("when the logInForm is valid", () => {
        const MOCK_USERNAME = "test@test.com";
        const MOCK_PASSWORD = "123456";
        beforeEach(() => {
          component.loginForm.controls['email'].setValue(MOCK_USERNAME);
          component.loginForm.controls['password'].setValue(MOCK_PASSWORD);
          spyOn(router, "navigateByUrl");
        });

        it("should login with signin-api", () => {
          spyOn(loginService, "loginAsStore").and.returnValue(of({
            "status": "OK",
            "result": {
              "id": "12345",
              "storeID": "walmart01",
              "storeName": "Walmart",
              "storeDescription": "Description"
            }
          }));

          component.onClickLogin();
          expect(loginService.loginAsStore).toHaveBeenCalledWith(MOCK_USERNAME, MOCK_PASSWORD);
        });

        it("should keep users'information after successfully logging in with signin-api", () => {
          spyOn(loginService, "loginAsStore").and.returnValue(of({
            "status": "OK",
            "result": {
              "id": "12345",
              "storeID": "walmart01",
              "storeName": "Walmart",
              "storeDescription": "Description"
            }
          }));
          spyOn(storeInformationService, "setInformation");

          component.onClickLogin();
          expect(storeInformationService.setInformation).toHaveBeenCalledWith(true, "walmart01", "Walmart");
        });

        it("should show error when logging in was unsuccessful", () => {
          spyOn(loginService, "loginAsStore").and.returnValue(throwError({
            error: {
              errors : ["Error1", "Error2"]
            }
          }));
          spyOn(window, "alert");

          component.onClickLogin();
          expect(window.alert).toHaveBeenCalledWith("Error1, Error2");
        });
      });
    });
  })
});
