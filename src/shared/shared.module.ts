import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorModule } from './interceptors/auth-interceptor.module';
import { register } from 'swiper/element/bundle';
register();

@NgModule({
  declarations: [],
  imports: [ReactiveFormsModule, HttpClientModule, AuthInterceptorModule],
  exports: [ReactiveFormsModule, HttpClientModule, AuthInterceptorModule],
  providers: [],
})
export class SharedModule {}
