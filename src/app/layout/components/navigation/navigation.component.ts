import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    MatIconButton,
    MatIcon,
    AsyncPipe
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @Input() isHandset$?: Observable<boolean>
}
