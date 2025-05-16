import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  template: `
    <footer>
      <div class="social-links">
        <a href="https://github.com/VashLT" class="social-link" aria-label="GitHub">
          <img
            src="./icons/github.svg"
            loading="lazy"
            decoding="async"
            alt="Github's logo"
          />
        </a>
        <a href="https://www.linkedin.com/in/jose-vash" class="social-link" aria-label="LinkedIn">
          <img
            src="./icons/linkedin.svg"
            loading="lazy"
            decoding="async"
            alt="LinkedIn's logo"
          />
        </a>
      </div>
      <div class="copyright mat-body-large">
        <span>© {{ currYear }} VashLT</span>
      </div>
    </footer>
  `,
  styles: `
    :host {
      margin-top: auto;
    }

    footer {
      background-color: var(--mat-sys-surface);
      padding: 1rem;
      border-top: 1px solid #e0e0e0;
      display: grid;
      justify-items: center;
      gap: .75rem;
    }

    .copyright {
      color: var(--mat-sys-on-surface-variant);
    }

    .social-links {
      display: flex;
      align-items: center;
      gap: .75rem;
    }

    .social-link {
      height: 1.75rem;
      width: 1.74rem;
      transition: brightness 0.2s;
      & img {
        width: 100%;
      }
    }

    .social-link:hover {
      filter: brightness(120%) ;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currYear = new Date().getFullYear();
}
