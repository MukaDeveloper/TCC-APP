import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorModule } from './interceptors/auth-interceptor.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as moment from 'moment';
import { register } from 'swiper/element/bundle';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
register();

moment.locale('pt-br');
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    AuthInterceptorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    AuthInterceptorModule,
    TranslateModule,
  ],
  providers: [],
})
export class SharedModule {}
