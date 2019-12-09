import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('create table IF NOT EXISTS places (id integer primary key not null , title text not null , imageUri text not null , address text not null, lat real not null, lng real not null  );',
                [],
                () => {
                    resolve();
                },
                (i, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};


export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('insert into places ( title , imageUri , address, lat, lng ) values (?,?,?,?,?);',
                [title, {imageUri}, address, lat, lng],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('select  * from  places',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};