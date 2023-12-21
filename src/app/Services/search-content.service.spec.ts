import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchContentService } from './search-content.service';
import { Person } from '../Models/Person';

describe('SearchContentService', () => {
  let service: SearchContentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchContentService],
    });

    service = TestBed.inject(SearchContentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve search results', () => {
    const searchTerm = 'john';
    const mockData: Person[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', gender: 'Male' },
    ];

    service.searchPeople(searchTerm).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}?searchTerm=${searchTerm}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });
});

