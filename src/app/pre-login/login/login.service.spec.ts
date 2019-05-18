import { TestBed } from '@angular/core/testing';
import { LoginService, LogInStoreResponse } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

fdescribe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [LoginService]
  }));

  beforeEach(() => {
    service = TestBed.get(LoginService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  describe('loginAsStore', () => {
    it('expects a Post request to sign-in at Back-End', (done) => {

      const mockResponse: LogInStoreResponse = {
        "status": "OK",
        "result": {
          "id": "12345",
          "storeID": "walmart01",
          "storeName": "Walmart",
          "storeDescription": "Description"
        }
      };

      service.loginAsStore("test@test.com", "123456").subscribe((result: LogInStoreResponse) => {
        expect(result).toEqual(mockResponse);
        done();
      });

      // At this point, the request is pending, and no response has been
      // sent. The next step is to expect that the request happened.
      const req = httpMock.expectOne(`http://${environment.host}/signin-store`);

      // If no request with that URL was made, or if multiple requests match,
      // expectOne() would throw. However this test makes only one request to
      // this URL, so it will match and return a mock request. The mock request
      // can be used to deliver a response or make assertions against the
      // request. In this case, the test asserts that the request is a GET.
      expect(req.request.method).toEqual('POST');

      // Next, fulfill the request by transmitting a response.
      req.flush(mockResponse);

      // Finally, assert that there are no outstanding requests.
      httpMock.verify();
    });
  });
});
