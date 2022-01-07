import { TestBed } from '@angular/core/testing';
import { ManageUsersDataSource } from './data-sources/manage.users.data.source';
import { UserEntity } from './entities/user.entity';
import { ManageUsersFeatureModule } from './manage.users.feature.module';
import { ManageUsersRepository } from './repositories/manage.users.repository';
import { CreateUserUseCase } from './use-cases/create.user.use.case';
import { DeleteUserUseCase } from './use-cases/delete.user.use.case';
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
    let mockUser: UserEntity;
    let dataSourceGetUserSpy: jasmine.Spy;
    beforeEach(() => {
      useCase = TestBed.inject(GetUserUseCase);
      dataSourceGetUserSpy = spyOn(dataSource, 'getUser');
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should get the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        dataSourceGetUserSpy.and.resolveTo(mockUser);

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalledOnceWith();
        expect(res).toBe(mockUser);
      });
    });
    describe('failure', () => {
      it('should return an error when the data source fails fetching the user from the backend', async () => {
        dataSourceGetUserSpy.and.throwError(new Error());

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalledOnceWith();
        expect(res).toBeInstanceOf(Error);
      });
      it('should return an error when the data source rejects the promise', async () => {
        dataSourceGetUserSpy.and.rejectWith();

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalledOnceWith();
        expect(res).toBeInstanceOf(Error);
      });
      describe('user is invalid', () => {
        it('should return an error when the user is undefined', async () => {
          mockUser = undefined;
          dataSourceGetUserSpy.and.resolveTo(mockUser);

          const res = await useCase.execute();

          expect(dataSource.getUser).toHaveBeenCalledOnceWith();
          expect(res).toBeInstanceOf(Error);
        });
        it('should return an error when the users id is undefined', async () => {
          mockUser = new UserEntity({ id: undefined });
          dataSourceGetUserSpy.and.resolveTo(mockUser);

          const res = await useCase.execute();

          expect(dataSource.getUser).toHaveBeenCalledOnceWith();
          expect(res).toBeInstanceOf(Error);
        });
        it('should return an error when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });
          dataSourceGetUserSpy.and.resolveTo(mockUser);

          const res = await useCase.execute();

          expect(dataSource.getUser).toHaveBeenCalledOnceWith();
          expect(res).toBeInstanceOf(Error);
        });
      });
    });
  });
  describe('use case: create user', () => {
    let useCase: CreateUserUseCase;
    let mockUser: UserEntity;
    let dataSourceCreateUserSpy: jasmine.Spy;
    beforeEach(() => {
      useCase = TestBed.inject(CreateUserUseCase);
      dataSourceCreateUserSpy = spyOn(dataSource, 'createUser');
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should create the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        dataSourceCreateUserSpy.and.resolveTo();

        const res = await useCase.execute(mockUser);

        expect(dataSource.createUser).toHaveBeenCalledOnceWith(mockUser);
        expect(res).not.toBeInstanceOf(Error);
      });
    });
    describe('failure', () => {
      it('should return an error when the data source fails creating the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        dataSourceCreateUserSpy.and.throwError(new Error());

        const res = await useCase.execute(mockUser);

        expect(dataSource.createUser).toHaveBeenCalledOnceWith(mockUser);
        expect(res).toBeInstanceOf(Error);
      });
      it('should return an error when the data source rejects the promise', async () => {
        mockUser = new UserEntity({ id: '1' });
        dataSourceCreateUserSpy.and.rejectWith();

        const res = await useCase.execute(mockUser);

        expect(dataSource.createUser).toHaveBeenCalledOnceWith(mockUser);
        expect(res).toBeInstanceOf(Error);
      });
      describe('user is invalid', () => {
        it('should return an error when the user is undefined', async () => {
          mockUser = undefined;

          const res = await useCase.execute(mockUser);

          expect(dataSource.createUser).not.toHaveBeenCalled();
          expect(res).toBeInstanceOf(Error);
        });
        it('should return an error when the users id is undefined', async () => {
          mockUser = new UserEntity({ id: undefined });

          const res = await useCase.execute(mockUser);

          expect(dataSource.createUser).not.toHaveBeenCalled();
          expect(res).toBeInstanceOf(Error);
        });
        it('should return an error when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });

          const res = await useCase.execute(mockUser);

          expect(dataSource.createUser).not.toHaveBeenCalled();
          expect(res).toBeInstanceOf(Error);
        });
      });
    });
  });
  describe('use case: delete user', () => {
    let useCase: DeleteUserUseCase;
    let mockUser: UserEntity;
    let dataSourceDeleteUserSpy: jasmine.Spy;
    beforeEach(() => {
      useCase = TestBed.inject(DeleteUserUseCase);
      dataSourceDeleteUserSpy = spyOn(dataSource, 'deleteUser');
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should delete the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        dataSourceDeleteUserSpy.and.resolveTo();

        const res = await useCase.execute(mockUser);

        expect(dataSource.deleteUser).toHaveBeenCalledOnceWith(mockUser);
        expect(res).not.toBeInstanceOf(Error);
      });
    });
    describe('failure', () => {
      it('should return an error when the data source fails deleting the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        dataSourceDeleteUserSpy.and.throwError(new Error());

        const res = await useCase.execute(mockUser);

        expect(dataSource.deleteUser).toHaveBeenCalledOnceWith(mockUser);
        expect(res).toBeInstanceOf(Error);
      });
      it('should return an error when the data source rejects the promise', async () => {
        mockUser = new UserEntity({ id: '1' });
        dataSourceDeleteUserSpy.and.rejectWith();

        const res = await useCase.execute(mockUser);

        expect(dataSource.deleteUser).toHaveBeenCalledOnceWith(mockUser);
        expect(res).toBeInstanceOf(Error);
      });
      describe('user is invalid', () => {
        it('should return an error when the user is undefined', async () => {
          mockUser = undefined;

          const res = await useCase.execute(mockUser);

          expect(dataSource.deleteUser).not.toHaveBeenCalled();
          expect(res).toBeInstanceOf(Error);
        });
        it('should return an error when the users id is undefined', async () => {
          mockUser = new UserEntity({ id: undefined });

          const res = await useCase.execute(mockUser);

          expect(dataSource.deleteUser).not.toHaveBeenCalled();
          expect(res).toBeInstanceOf(Error);
        });
        it('should return an error when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });

          const res = await useCase.execute(mockUser);

          expect(dataSource.deleteUser).not.toHaveBeenCalled();
          expect(res).toBeInstanceOf(Error);
        });
      });
    });
  });
});
