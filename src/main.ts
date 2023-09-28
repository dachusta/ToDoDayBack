import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.firebase_type,
      project_id: process.env.firebase_project_id,
      private_key_id: process.env.firebase_private_key_id,
      private_key: process.env.firebase_private_key.replace(/\\n/g, '\n'),
      client_email: process.env.firebase_client_email,
      client_id: process.env.firebase_client_id,
      auth_uri: process.env.firebase_auth_uri,
      token_uri: process.env.firebase_token_uri,
      auth_provider_x509_cert_url:
        process.env.firebase_auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.firebase_client_x509_cert_url,
      universe_domain: process.env.firebase_universe_domain,
    } as Partial<admin.ServiceAccount>),
    databaseURL: process.env.firebase_database_URL,
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
