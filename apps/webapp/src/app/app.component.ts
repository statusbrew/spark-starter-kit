import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarComponent, UiComponent } from '@spark-starter-kit/ui';

@Component({
  standalone: true,
  imports: [RouterModule, UiComponent, AvatarComponent],
  selector: 'spark-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
