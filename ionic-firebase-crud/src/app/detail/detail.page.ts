import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataSnapshot, getDatabase, onValue, ref, remove } from "firebase/database";

const db = getDatabase();

export const snapshotToObject = (snapshot: DataSnapshot) => {
  const item = snapshot.val();
  if (!item) return null;
  item.key = snapshot.key;
  return item;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false
})
export class DetailPage implements OnInit {

  info: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController // 👈 agregamos AlertController
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    const infoRef = ref(db, 'infos/' + this.route.snapshot.paramMap.get('id'));
    onValue(infoRef, (snapshot) => {
      const data = snapshotToObject(snapshot);
      if (data) {
        this.info = data;
      }
    });
  }

  async deleteInfo() {
    const id = this.route.snapshot.paramMap.get('id');

    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar esta información?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            const deleteRef = ref(db, 'infos/' + id);
            remove(deleteRef)
              .then(() => {
                console.log("Información eliminada con éxito");
                this.router.navigate(['/list']); // 👈 vuelve a la lista
              })
              .catch((error) => {
                console.error("Error al eliminar:", error);
              });
          }
        }
      ]
    });

    await alert.present();
  }
}
