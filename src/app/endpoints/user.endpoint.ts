import { environment } from '../../environments/environment';

export class UserEndpoint {
    static authenticate = `${environment.baseUrl}authenticate/obtain_token/`;
    static listPost = `${environment.baseUrl}usuarios/`;
    static travelsUser = `${environment.baseUrl}usuarios/{}/travels/`;
    static tracking = `${environment.baseUrl}usertracking/`;
}
