import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { ModalCategoriasPage } from '../modal-categorias/modal-categorias.page';
import { ModalNivelesAcademicosPage } from '../modal-niveles-academicos/modal-niveles-academicos.page';
import { ModalGestionarAdministradoresPage } from '../modal-gestionar-administradores/modal-gestionar-administradores.page';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-tab-admin3',
  templateUrl: './tab-admin3.page.html',
  styleUrls: ['./tab-admin3.page.scss'],
})
export class TabAdmin3Page implements OnInit {


  constructor(private menuCtrl: MenuController, private modalCtrl: ModalController, private categoriaService: UsuarioService) { }

  public categorias: Categoria
  public status;

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
  }

  menus: Menu[] = [
    {
      icon: 'md-albums',
      name: 'Administrar Categorias',
      action: 'categories'
    },
    {
      icon: 'md-speedometer',
      name: 'Administrar Nivel Academico',
      action: 'academicLevel'
    },
    {
      icon: 'md-contact',
      name: 'Administrar Usuarios',
      action: 'user'
    }
  ]

  async openModal(accion) {
    if (accion == 'categories') {
      const modal = await this.modalCtrl.create({

        component: ModalCategoriasPage,

      });
  
      await modal.present();
    }
    else if (accion == 'academicLevel') {
      const modal = await this.modalCtrl.create({

        component: ModalNivelesAcademicosPage,

      });
    
      await modal.present();

    } else if (accion == 'user') {
      const modal = await this.modalCtrl.create({

        component: ModalGestionarAdministradoresPage,

      });
    
      await modal.present();
    }

  }

}//Llave principal

interface Menu {
  icon: string,
  name: string,
  action: string
}
