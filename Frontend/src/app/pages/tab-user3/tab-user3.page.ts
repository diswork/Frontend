import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab-user3',
  templateUrl: './tab-user3.page.html',
  styleUrls: ['./tab-user3.page.scss'],
})
export class TabUser3Page implements OnInit {

  usuario : User;

  

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUserLog();
    console.log(this.usuario)
  }

}
