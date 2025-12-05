import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { TypeormConfig } from 'src/config/typeorm-config.service';
import { E2ETypeormConfig } from './config/e2e-typeorm-config.service';

export const createE2ETestingModule = async () => {
  const moduleBuilder = Test.createTestingModule(
    {
      imports: [AppModule],
    },
    {
      moduleIdGeneratorAlgorithm: 'deep-hash',
    },
  );
  moduleBuilder.overrideProvider(TypeormConfig).useClass(E2ETypeormConfig);

  return moduleBuilder.compile();
};
