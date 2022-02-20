import { Gender, HealthCheckRating } from "../types";
import { NewPatient, NewEntry } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!String(rating) || !isRating(Number(rating))) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return Number(rating);
};

const toNewPatient = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(object.name),
    ssn: parseName(object.ssn),
    occupation: parseName(object.occupation),
    gender: parseGender(object.gender),
    dateOfBirth: parseDate(object.dateOfBirth)
  };
  return newEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  switch (object.type) {
    case 'Hospital': {
      const newEntry: NewEntry = {
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
        newEntry.diagnosisCodes = object.diagnoseCodes
      }
      return newEntry;
    }
    case 'OccupationalHealthcare': {
      const newEntry: NewEntry = {
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
        newEntry.diagnosisCodes = object.diagnoseCodes
      }
      return newEntry;
    }
    case 'HealthCheck': {
      const newEntry: NewEntry = {
        description: parseName(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      };
      if (object.diagnoseCodes) {
        newEntry.diagnosisCodes = object.diagnoseCodes
      }
      return newEntry;
    }
    default:
      throw new Error('Wrong type in new entry!');
  }
};

export default toNewPatient;
