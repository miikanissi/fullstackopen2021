"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../src/types");
const patients = [
    {
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        name: 'John McClane',
        dateOfBirth: '1986-07-09',
        ssn: '090786-122X',
        gender: types_1.Gender.Male,
        occupation: 'New york city cop',
        entries: [],
    },
    {
        id: 'd2773598-f723-11e9-8f0b-362b9e155667',
        name: 'Martin Riggs',
        dateOfBirth: '1979-01-30',
        ssn: '300179-777A',
        gender: types_1.Gender.Male,
        occupation: 'Cop',
        entries: [],
    },
    {
        id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
        name: 'Hans Gruber',
        dateOfBirth: '1970-04-25',
        ssn: '250470-555L',
        gender: types_1.Gender.Male,
        occupation: 'Technician',
        entries: [],
    },
    {
        id: 'd2773822-f723-11e9-8f0b-362b9e155667',
        name: 'Dana Scully',
        dateOfBirth: '1974-01-05',
        ssn: '050174-432N',
        gender: types_1.Gender.Female,
        occupation: 'Forensic Pathologist',
        entries: [],
    },
    {
        id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
        name: 'Matti Luukkainen',
        dateOfBirth: '1971-04-09',
        ssn: '090471-8890',
        gender: types_1.Gender.Male,
        occupation: 'Digital evangelist',
        entries: [],
    },
];
exports.default = patients;
