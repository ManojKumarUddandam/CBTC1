import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private db: AngularFireDatabase) { }

  // Example method to get data from the database
  getData() {
    return this.db.list('/path/to/data').valueChanges();
  }

  // Example method to write data to the database
  writeData(data: any) {
    return this.db.list('/path/to/data').push(data);
  }

  // Example method to update data in the database
  updateData(key: string, newData: any) {
    return this.db.object('/path/to/data/' + key).update(newData);
  }

  // Example method to delete data from the database
  deleteData(key: string) {
    return this.db.object('/path/to/data/' + key).remove();
  }
}
