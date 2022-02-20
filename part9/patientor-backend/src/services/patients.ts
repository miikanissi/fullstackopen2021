import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from '../types';
import uuid = require('uuid');

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  // TODO: Declare types
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p: any) => p.id === id);
  if (!patient) {
    throw new Error("Cannot find patient with id " + id);
  }
  return patient;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatientEntry = {
      id: uuid.v1(),
      entries: [],
      ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
  };

const addEntryToId = ( entry: NewEntry, id: Patient['id'] ): Entry | undefined => {
  const newEntry = {
      id: uuid.v1(),
      ...entry
    };
    try {
      const index = patients.map((p: any) => p.id).indexOf(id);
      patients[index].entries.push(newEntry);
      return newEntry;
    } catch (e: unknown) {
      return undefined;
    }
  };

export default {
  getPatients,
  getPublicPatients,
  findPatient,
  addPatient,
  addEntryToId
};
