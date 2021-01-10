import { Container as InversifyContainer, interfaces, ContainerModule } from 'inversify';
import { AppLogger } from './../loggers/app.logger';
import { RequestLogger } from './../loggers/request.logger';
import { ResponseLogger } from './../loggers/response.logger';
import { RequestLoggerMiddleware } from './../middlewares/request-logger.middleware';
import { ResponseLoggerMiddleware } from './../middlewares/response-logger.middleware';
import { ErrorMiddleware } from './../middlewares/error.middleware';
import { AppConfig } from './app.config';
import { ErrorExtractor } from './../helpers/error-extractor.helper';
import { App } from './../app';
import { ProductMockRepository } from '../repositories/implementations/product.mock.repository';
import { ProductController } from '../controllers/product.controller';
import { TransactionController } from '../controllers/transaction.controller';
import { ProductService } from '../services/product.service';
import { TransactionService } from '../services/transaction.service';
import { BaseController } from './../controllers/base.controller';
import { ProductBaseRepository } from '../repositories/product.base.repository';
import { TransactionBaseRepository } from '../repositories/transaction.base.repository';
import { TransactionMockRepository } from '../repositories/implementations/transaction.mock.repository';

export class Container {
    private _container: InversifyContainer = new InversifyContainer();
  
    protected get container(): InversifyContainer {
      return this._container;
    }
  
    constructor() {
      this.register();
    }
  
    public getApp(): App {
      return this.container.get(App);
    }
  
    // https://github.com/inversify/InversifyJS/blob/master/wiki/recipes.md#injecting-dependencies-into-a-function
    private bindDependencies(func: Function, dependencies: any[]): Function {
      let injections = dependencies.map((dependency) => {
        return this.container.get(dependency);
      });
      return func.bind(func, ...injections);
    }
  

    private register(): void {
      
      this._container.load(this.getRepositoriesModule());      
      this._container.load(this.getLoggersModule());
      this._container.load(this.getMiddlewaresModule());
      this._container.load(this.getGeneralModule());
      this._container.load(this.getControllersModule());
      this._container.load(this.getHelpersModule());
      this._container.load(this.getServicesModule());
      this._container.bind<App>(App).toSelf();
    }
  
    
    private getControllersModule(): ContainerModule {
      return new ContainerModule((bind: interfaces.Bind) => {
        bind<BaseController>(BaseController).to(ProductController);
        bind<BaseController>(BaseController).to(TransactionController);
      });
    }
  
    private getServicesModule(): ContainerModule {
      return new ContainerModule((bind: interfaces.Bind) => {
        bind<ProductService>(ProductService).toSelf();
        bind<TransactionService>(TransactionService).toSelf();
      });
    }
    

    private getRepositoriesModule(): ContainerModule {
      return new ContainerModule((bind: interfaces.Bind) => {
        bind<ProductBaseRepository>(ProductBaseRepository).toConstantValue(new ProductMockRepository());
        bind<TransactionBaseRepository>(TransactionBaseRepository).toConstantValue(new TransactionMockRepository());
      });
    }
  
    
    private getLoggersModule(): ContainerModule {
      return new ContainerModule((bind: interfaces.Bind) => {
        bind<AppLogger>(AppLogger).toSelf();
        bind<RequestLogger>(RequestLogger).toSelf();
        bind<ResponseLogger>(ResponseLogger).toSelf();
      });
    }
  
    private getMiddlewaresModule(): ContainerModule {
        return new ContainerModule((bind: interfaces.Bind) => {
        bind<RequestLoggerMiddleware>(RequestLoggerMiddleware).toSelf();
        bind<ErrorMiddleware>(ErrorMiddleware).toSelf();
        bind<ResponseLoggerMiddleware>(ResponseLoggerMiddleware).toSelf();
      });
    }
  
    private getGeneralModule(): ContainerModule {
      return new ContainerModule((bind: interfaces.Bind) => {
        bind<AppConfig>(AppConfig).toSelf().inSingletonScope();
      });
    }
  
    private getHelpersModule(): ContainerModule {
      return new ContainerModule((bind: interfaces.Bind) => {
        bind<ErrorExtractor>(ErrorExtractor).toSelf();
      });
    }
  }
  