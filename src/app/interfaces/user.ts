export interface IUser {
    id: number;
    username: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    foto: string;
    sexo: number;
    correo: string;
    telefono1: string;
    telefono2: string;
    password: string;
    last_login: string;
    is_active: boolean;
    is_staff: boolean;
    role: number;
}

export interface ICredentials {
    username: string;
    password: string;
}

export interface IUserTracking {
    id?: number;
    user: number;
    starttask: string;
    endtask: string;
    start_longitude: number;
    end_longitude: number;
    start_latitude: number;
    end_latitude: number;
    signature: string;
    rating: number;
}

export interface IUserTrackingDetail {
    id?: number;
    user: IUser;
    starttask: string;
    endtask: string;
    start_longitude: number;
    end_longitude: number;
    start_latitude: number;
    end_latitude: number;
    url?: string;
}
