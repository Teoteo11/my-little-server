import * as fs from 'fs';
import { User } from './models/user';
import { italianFirstNames, italianLastNames, europeanCountries } from './utils/data-for-generate-users';


const generateItalianPhoneNumber = () => {
  const prefix = '+39';
  const number = Math.floor(Math.random() * 9000000000) + 1000000000;
  return `${prefix}${number}`;
};

const generateRandomRegistrationDate = () => {
  const start = new Date('2024-01-01').getTime();
  const end = new Date('2024-12-31').getTime();
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const deduceGender = (firstName: string) => {
  const maleNames = ['Marco', 'Luca', 'Alessandro', 'Giuseppe', 'Giorgio'];
  const femaleNames = ['Giulia', 'Francesca', 'Maria', 'Chiara', 'Silvia'];

  if (maleNames.includes(firstName)) return 'male';
  if (femaleNames.includes(firstName)) return 'female';
  return 'other';
};


const generateUser = (): User => {
  const firstName = italianFirstNames[Math.floor(Math.random() * italianFirstNames.length)];
  const lastName = italianLastNames[Math.floor(Math.random() * italianLastNames.length)];
  const fullName = `${firstName} ${lastName}`;

  return {
    fullName,
    phoneNumber: generateItalianPhoneNumber(),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
    registrationDate: generateRandomRegistrationDate().toString(),
    role: Math.random() > 0.2 ? 'user' : 'admin',
    gender: deduceGender(firstName),
    country: europeanCountries[Math.floor(Math.random() * europeanCountries.length)]
  };
};

export const generateUsers = (numUsers: number) => {
  const users: User[] = [];

  for (let i = 0; i < numUsers; i++) {
    users.push(generateUser());
  }

  fs.writeFileSync('src/generated/users.json', JSON.stringify(users, null, 2), 'utf-8');
  return users;
};
