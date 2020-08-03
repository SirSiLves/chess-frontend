import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FieldComponent} from './field/field.component';
import {FooterComponent} from './footer/footer.component';
import {NavComponent} from './nav/nav.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FigureComponent} from './figure/figure.component';
import {PawnComponent} from './figure/pawn/pawn.component';
import {KingComponent} from './figure/king/king.component';
import {BishopComponent} from './figure/bishop/bishop.component';
import {KnightComponent} from './figure/knight/knight.component';
import {RookComponent} from './figure/rook/rook.component';
import {QueenComponent} from './figure/queen/queen.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InterceptorService} from "./services/interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    FieldComponent,
    FooterComponent,
    NavComponent,
    FigureComponent,
    PawnComponent,
    KingComponent,
    BishopComponent,
    KnightComponent,
    RookComponent,
    QueenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  /* providers: [
    {
      // https://pusher.com/tutorials/error-handling-angular-part-2
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],*/
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
