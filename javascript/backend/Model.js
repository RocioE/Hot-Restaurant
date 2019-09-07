"use strict";
/* global module */


class Model {

    constructor(tableCount) {

        this.tableCount = tableCount;

        this.reservations = [];

        this.waitingList = [];

        this.uniqueIDs = [];
    }

    reserveTable(id, name, phone, email) {

        if (this.uniqueIDs.includes(id)) {

            return Promise.reject(Model.inValidNewReservation + 'ID is already taken.');
        }

        const newReservation = new Reservation(id, name, phone, email);

        if (newReservation.isValid) {

            this.uniqueIDs.push(newReservation.id);

            if (this.reservations.length < this.tableCount) {

                this.reservations.push(newReservation);

                return Promise.resolve(Model.addedReservation);
            }
            else {

                this.waitingList.push(newReservation);

                return Promise.resolve(Model.addedToWaitingList);
            }
        }
        else {

            return Promise.reject(Model.inValidNewReservation + newReservation.validationMSG);
        }
    }

    getAllReservations() {

        return Promise.resolve(this.reservations);
    }

    getWaitingList() {

        return Promise.resolve(this.waitingList);
    }

    static get addedReservation() { return 'addedReservation'; }
    static get addedToWaitingList() { return 'addedToWaitingList'; }
    static get inValidNewReservation() { return 'inValidNewReservation:  '; }
}

class Reservation {

    constructor(id, name, phone, email) {

        this.isValid = true;
        this.validationMSG = "";

        if (typeof id !== 'number') {
            this.isValid = false;
            this.validationMSG = "Bad value:  ID";
            return;
        }

        if (typeof name !== 'string' || name.length === 0) {
            this.isValid = false;
            this.validationMSG = "Bad value:  NAME";
            return;
        }

        if (typeof phone !== 'string' || phone.length === 0) {
            this.isValid = false;
            this.validationMSG = "Bad value:  PHONE";
            return;
        }

        if (typeof email !== 'string' || email.length === 0) {
            this.isValid = false;
            this.validationMSG = "Bad value:  EMAIL";
            return;
        }

        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}



module.exports = Model;