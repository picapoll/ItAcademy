import { Component, OnInit } from '@angular/core'; // importamos estructura de componente i funcionalidad de onInit
import { RequestService } from '../request.service'; // importamos el servicio que contiene las funcionalidades para conectar con la api rest

@Component({
  selector: 'request', // etiqueta del nombre del componente
  templateUrl: './request.component.html', // vista del componente
  styleUrls: ['./request.component.sass'], // hoja de estilo del componente
  providers: [RequestService] // caracteristicas que importamos del servicio
})

export class RequestComponent implements OnInit {
  public user: any // aquí encapsularemos toda la data que recibimos de la API con el metodo get
  public userId: any // variable que permite modificar el numero del Id que le estamos solicitando a la API
  public newUser: any // variable que permite añadir un nuevo usuario
  public newUserId: any // variable que permite encapsular la respuesta que recibimos de la API una vez ejecutado el post.

  constructor(
    private _requestService: RequestService // definimos el servicio RequestService bajo una variable privada para que podamos acceder a sus métodos e informaciones.
  ) {
    this.newUser={ // definimos que newUser tenga la estructura que nos pide la API para poder postear los datos y no nos dé error. Lo hacemos mediante un archivo JSON.
      "name": "",
      "job": ""
    }
   }

  ngOnInit() {
    this.downUser(); // ejecutamos solo al iniciar la web el metodo que nos permite hacer el GET de la Api. Esto lo podemos obviar, porque realmente invocaremos el metodo downUser a traves de un click.
  }

  downUser(){ // definimos el metodo que nos permitira hacer el get
    this._requestService.getUser(this.userId).subscribe( // accedemos a requestService e invocamos su metodo getUser, pasandole como parametro el valor userId.
      result => { // si todo se ha introducido bien y el resultado es favorable desde la API.
        console.log(result); // que se muestre pon consola el resultado
        this.user=result.data // y encapsulamos la data del resultado en el valor user; para así poder acceder a él en la vista usando {{user.name}} por ejemplo
      },
      error =>{ // definimos que si hay un error se muestre por consola.
        console.log(<any>error);
      }
    );
  }

  onSubmit(form){ // definimos el metodo que nos permite hacer el post
    this._requestService.addUser(this.newUser).subscribe( //accedemos a requestService e invocamos su metodo addUser, pasandole como parametro el valor newUser.
      response=>{ // si la respuesta es favorable que se muestre en consola y se encapsule la respuesta en la variable newUserId
        console.log(response);
        this.newUserId = response;
      },
      error=>{ // si hay error que se muestre por pantalla
        console.log(<any>error);

      }
    )
  }

}
