const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { nanoid } = require("nanoid");

const updateContacts = async (contacts) =>
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const contacts = await readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const { result } = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result || null;
}

// async function addContact(data) {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...data,
//   };
//   contacts.push(newContact);
//   await writeFile(contactsPath, JSON.stringify(contacts));
//   return newContact;
// }

module.exports = {
  updateContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
