import { Injectable } from '@angular/core'; 
// propiedad que permite que este servicio sea inyectable en cualquier otro componente
import { HttpClient, HttpHeaders} from '@angular/common/http'; 
// propiedades referentes a la interacción con los servidores HTTP.
import { Observable } from 'rxjs'; 
// propiedad que permite que haya una interacción y la app esté "pendiente" de los datos que introducimos

@Injectable() //decorador necessario
export class RequestService { // exportamos el servicio bajo la classe RequestService
  public url: string; //definimos variable que se llama url que encapsulará la dirección web
  constructor(
    public _http: HttpClient // en el constructor definimos la propiedad que nos permite acceder a la funcionalidades relacionada con los servidores HTTP
  ) {
    this.url ="https://reqres.in/"; // accedemos a url y definimos la dirección web
  }

  // creamos el metodo de obtención de los usuarios que nos brinda la rest api
  getUser(userId):Observable<any>{
    //le pasamos el valor userId y su observable para que se puede ir modificando el valor según interactuamos por la vista

    return this._http.get(this.url + 'api/users/'+userId);
    // ejecutamos que se acceda dentro de la propiedad http i se ejecute la función get en la url que le hemos indicado, además le añadimos la info que falta a la url y hacemos que el número de página al que se acceda dependa del valor userId QUE NOSOTROS MISMO vamos modificando en la vista.
  }

  //creamos el metodo que generará el añadido del usuario, tiene un observable porque esté lo que hace es estar pendiente de la información que le vamos a pasar
  addUser(user):Observable<any>{ 
    // nombramos al método y le pasamos el parametro que se va a modificar, en este caso user; junto con la propiedad observable

    let params = JSON.stringify(user); 
    // encapsulamos el parametro que usuario y lo convertimos de un string a un objeto json para que el backend(api) nos lo acepte

    let headers = new HttpHeaders().set('Content-type', 'application/json'); 
    // le decimos que los Headers contienen datos json

    return this._http.post(this.url+'api/users', params, {headers: headers}); 
    // ejecutamos que se acceda a la propiedad http con la url que hemos definido anteriormente,diciendole que añadiremos params (que es la info que añadiremos) y los headers como headers. 
  }
}
