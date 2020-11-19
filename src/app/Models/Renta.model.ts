export interface RentaResponse {
    datos: DatoUsuario[];
}

export interface DatoUsuario {
    fecha_fin:       string;
    precio:          number;
    fecha_inicio:    string;
    nombre:          string;
    nombre_pelicula: string;
    direccion:       string;
    url:             string;
}
