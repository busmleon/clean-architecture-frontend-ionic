import { TestBed } from '@angular/core/testing';
import { ManageUsersDataSource } from './data-sources/manage.users.data.source';
import { ManageUsersFeatureModule } from './manage.users.feature.module';
import { ManageUsersRepository } from './repositories/manage.users.repository';
import { GetUserUseCase } from './use-cases/get.user.use.case';

describe('feature: manage-users', () => {
  let dataSource: ManageUsersDataSource;
  let repository: ManageUsersRepository;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ManageUsersFeatureModule] });
    dataSource = TestBed.inject(ManageUsersDataSource);
    repository = TestBed.inject(ManageUsersRepository);
  });
  it('should have a dataSource and repository', () => {
    expect(dataSource).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('use case: get user', () => {
    let useCase: GetUserUseCase;
    beforeEach(() => {
      useCase = TestBed.inject(GetUserUseCase);
    });
    describe('success', () => {
      it('should get the user', () => { });
    });
    describe('failure', () => {
      it('should return an error saying the user could not be found', () => { });
    });
  });
});
