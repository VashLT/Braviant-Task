import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule],
  template: `
  <mat-toolbar color="primary"><mat-toolbar>
    <span>My Application</span>
    <ul class="remote-menu">
    <li><a routerLink="/">Home</a></li>
    <li><a routerLink="login">Login</a></li>
  </ul>
  </mat-toolbar>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
