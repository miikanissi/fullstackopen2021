"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const isRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseRating = (rating) => {
    if (!String(rating) || !isRating(Number(rating))) {
        throw new Error('Incorrect or missing rating: ' + rating);
    }
    return Number(rating);
};
const toNewPatient = (object) => {
    const newEntry = {
        name: parseName(object.name),
        ssn: parseName(object.ssn),
        occupation: parseName(object.occupation),
        gender: parseGender(object.gender),
        dateOfBirth: parseDate(object.dateOfBirth)
    };
    return newEntry;
};
const toNewEntry = (object) => {
    switch (object.type) {
        case 'Hospital': {
            const newEntry = {
                description: parseName(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                type: 'Hospital',
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseName(object.discharge.criteria)
                }
            };
            if (object.diagnoseCodes) {
                newEntry.diagnosisCodes = object.diagnoseCodes;
            }
            return newEntry;
        }
        case 'OccupationalHealthcare': {
            const newEntry = {
                description: parseName(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                type: 'OccupationalHealthcare',
                employerName: parseName(object.employerName),
                sickLeave: {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate)
                }
            };
            if (object.diagnoseCodes) {
                newEntry.diagnosisCodes = object.diagnoseCodes;
            }
            return newEntry;
        }
        case 'HealthCheck': {
            const newEntry = {
                description: parseName(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                type: 'HealthCheck',
                healthCheckRating: parseRating(object.healthCheckRating)
            };
            if (object.diagnoseCodes) {
                newEntry.diagnosisCodes = object.diagnoseCodes;
            }
            return newEntry;
        }
        default:
            throw new Error('Wrong type in new entry!');
    }
};
exports.toNewEntry = toNewEntry;
exports.default = toNewPatient;
