import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardComponent} from './business/board/board.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FieldComponent} from './business/field/field.component';
import {FooterComponent} from './footer/footer.component';
import {NavComponent} from './header/nav/nav.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FigureComponent} from './business/figure/figure.component';
import {PawnComponent} from './business/figure/pawn/pawn.component';
import {KingComponent} from './business/figure/king/king.component';
import {BishopComponent} from './business/figure/bishop/bishop.component';
import {KnightComponent} from './business/figure/knight/knight.component';
import {RookComponent} from './business/figure/rook/rook.component';
import {QueenComponent} from './business/figure/queen/queen.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InterceptorService} from "./services/interceptor.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import { WinnerComponent } from './business/winner/winner.component';
import { ClockComponent } from './header/clock/clock.component';
import { PawnPromotionComponent } from './business/pawn-changer/pawn-promotion.component';

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
    QueenComponent,
    WinnerComponent,
    ClockComponent,
    PawnPromotionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule
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
