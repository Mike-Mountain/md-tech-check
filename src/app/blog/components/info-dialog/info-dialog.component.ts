import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose
  ],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  private dialogRef = inject(MatDialogRef<InfoDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  constructor() {
    if (this.data.body) {
      this.dialogRef.updateSize('60vw', '30vh');
    }
  }
}
