import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressService } from '../../../services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit {

  mode: ProgressBarMode = 'determinate';
  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {

    // Subscribe to the Progress Service to receive state notifications.
    this.progressService.getProgressObservable().subscribe((active) => {
      (active) ? this.mode = 'indeterminate' : this.mode = 'determinate';
      console.log('Progess state = ', active);
    });
  }

}
