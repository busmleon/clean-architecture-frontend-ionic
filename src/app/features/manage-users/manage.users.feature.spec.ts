import { TestBed } from '@angular/core/testing';
import { ManageUsersDataSource } from './data-sources/manage.users.data.source';
import { UserEntity } from './entities/user.entity';
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
  it('should have a defined dataSource and repository', () => {
    expect(dataSource).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('use case: get user', () => {
    let useCase: GetUserUseCase;
    beforeEach(() => {
      useCase = TestBed.inject(GetUserUseCase);
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should get the user', async () => {
        const mockUser = new UserEntity({ id: '1' });

        spyOn(dataSource, 'getUser').and.resolveTo(mockUser);

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalledOnceWith();
        expect(res).toBe(mockUser);
      });
    });
    describe('failure', () => {
      it('should return an error when the data source fails fetching the user from the backend', async () => {
        spyOn(dataSource, 'getUser').and.throwError(new Error());

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalledOnceWith();
        expect(res).toBeInstanceOf(Error);
      });
      describe('user is invalid', () => {
        it('should return an error when the user is undefined', async () => {
          const mockUser: UserEntity = undefined;
          spyOn(dataSource, 'getUser').and.resolveTo(mockUser);

          const res = await useCase.execute();

          expect(dataSource.getUser).toHaveBeenCalledOnceWith();
          expect(res).toBeInstanceOf(Error);
        });
        it('should return an error when the user is undefined', async () => {
          const mockUser: UserEntity = undefined;
          spyOn(dataSource, 'getUser').and.resolveTo(mockUser);

          const res = await useCase.execute();

          expect(dataSource.getUser).toHaveBeenCalledOnceWith();
          expect(res).toBeInstanceOf(Error);
        });
      });
    });
  });
});
