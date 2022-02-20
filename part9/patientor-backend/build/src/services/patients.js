"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getPublicPatients = () => {
    // TODO: Declare types
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const findPatient = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (!patient) {
        throw new Error("Cannot find patient with id " + id);
    }
    return patient;
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: uuid.v1(), entries: [] }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addEntryToId = (entry, id) => {
    const newEntry = Object.assign({ id: uuid.v1() }, entry);
    try {
        const index = patients_1.default.map((p) => p.id).indexOf(id);
        patients_1.default[index].entries.push(newEntry);
        return newEntry;
    }
    catch (e) {
        return undefined;
    }
};
exports.default = {
    getPatients,
    getPublicPatients,
    findPatient,
    addPatient,
    addEntryToId
};
