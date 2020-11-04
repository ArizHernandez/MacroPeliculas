export interface CastResponse {
    id:   number;
    cast: Cast[];
    crew: Crew[];
}

export interface Cast {
    cast_id:      number;
    character:    string;
    credit_id:    string;
    gender:       number;
    id:           number;
    name:         string;
    order:        number;
    profile_path: null | string;
}

export interface Crew {
    credit_id:    string;
    department:   string;
    gender:       number;
    id:           number;
    job:          string;
    name:         string;
    profile_path: null;
}
