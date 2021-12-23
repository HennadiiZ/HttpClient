import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable} from 'rxjs';
import { delay } from 'rxjs/operators'
import { Todo } from './todos.service'
import { TodoService } from './todos.service'

// export interface Todo {
//   completed: boolean
//   title: string
//   id?: number
// }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  todos: Todo[] = [];

  loading = false;

  todoTitle = '';
  
  error = '';

  //constructor(private http: HttpClient)
  constructor(private todosService: TodoService){}

  ngOnInit(){
    //  this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    //  .subscribe(response => {
    //    console.log(response)
    //    this.todos = response
    //  })

    // this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    // .subscribe(todos => {
    //   console.log(todos)
    //   this.todos = todos
    // })

    this.fetchTodos()
  }

  addTodo(){
    if(!this.todoTitle.trim()){
      return 
    }

    // const newTodo: Todo = {
    //   title: this.todoTitle,
    //   completed: false
    // }

    this.todosService.addTodo({
        title: this.todoTitle,
        completed: false
      }).subscribe(todo=>{
        this.todos.push(todo)
        this.todoTitle = ''
      })
      
    // this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo ) // newTodo - instead of body
    // .subscribe(todo=>{
    //   console.log('todo', todo)
    //   this.todos.push(todo)
    //   this.todoTitle = ''
    // })
  }

  fetchTodos(){
    // this.loading = true
    // this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    // .subscribe(todos => {
    //   this.todos = todos
    //   this.loading = false 
    // })

    // this.loading = true
    // this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    // .pipe(delay(1500))
    // .subscribe(todos => {
    //   this.todos = todos
    //   this.loading = false 
    // })


    // this.loading = true
    // this.todosService.fetchTodos()
    // .subscribe(todos => {
    //   this.todos = todos
    //   this.loading = false 
    // })

    this.loading = true
    this.todosService.fetchTodos()
    .subscribe(todos => {
      this.todos = todos
      this.loading = false 
    }, error=>{
      // console.log(error)
      // console.log(error.message)
      this.error = error.message
    })
  }

  // removeTodo(id: number)
  removeTodo(id: any){
        // this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        // .subscribe(response => {
        //   console.log(response)
        // })

        // this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
        // .subscribe(() => {
        //   this.todos = this.todos.filter(todo=> todo.id !==id)
        // })

        this.todosService.removeTodo(id)
        .subscribe(() => {
          this.todos = this.todos.filter(todo=> todo.id !==id)
        })
  }


  completeTodo(id: any) {
     this.todosService.completeTodo(id).subscribe(todo=>{
       console.log(todo)
       this.todos.find(t=> t.id === todo.id)!.completed = true
     })
  }


}
