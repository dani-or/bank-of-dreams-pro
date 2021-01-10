import { injectable } from 'inversify';
import { cleanEnv, str, port, host, bool, num } from 'envalid';

@injectable()
export class AppConfig {
    public readonly sourcePath: string = './src';
    public readonly apiPath: string = '/api';

    
    private _applicationHost: string;
    public get applicationHost(): string {
        return this._applicationHost;
    }

    private _applicationPort: number;
    public get applicationPort(): number {
    return this._applicationPort;
    }

    private _debug: boolean;
    public get debug(): boolean {
      return this._debug;
    }

    public setApplicationHost(host: string) {
        this._applicationHost = 'localhost';
    }

    public initialize(processEnv: NodeJS.ProcessEnv) {
        const env = cleanEnv(processEnv, {
          MONGO_USER: str({ example: 'lkurzyniec', devDefault: '' }),
          MONGO_PASSWORD: str({ example: 'someSTRONGpwd123', devDefault: '' }),
          MONGO_HOST: host({ devDefault: 'localhost', example: 'mongodb0.example.com' }),
          MONGO_PORT: port({ default: 27017 }),
          MONGO_DATABASE: str({ default: 'libraryDB' }),
          APPLICATION_PORT: port({ devDefault: 5000, desc: 'Port number on which the Application will run' }),
          DEBUG: bool({ default: false, devDefault: true }),
          TOKEN_EXPIRATION_IN_MIN: num({ default: 15, devDefault: 60 }),
        });
        this._applicationPort = env.APPLICATION_PORT;
        this._debug = env.DEBUG;
      }
}