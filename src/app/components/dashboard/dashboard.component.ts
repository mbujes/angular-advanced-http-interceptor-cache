import { DataService } from './../../services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  todos: Todo[];
  getTodosSub: Subscription;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getTodosSub = this.dataService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  ngOnDestroy() {
    if (this.getTodosSub) {
      this.getTodosSub.unsubscribe();
    }
  }
}
