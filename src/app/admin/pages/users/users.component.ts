import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DatePipe]
})
export class UsersComponent implements OnInit {
  public $users!: Observable<User[]>;

  constructor(
    private _usersService: UsersService
  ){}

  ngOnInit(): void {
    this.$users = this._usersService.getUsers();
    console.log(this.$users);
  }

}
