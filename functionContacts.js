const fs = require('fs')
const path = require('path')
const { resolve } = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

const fetchContacts = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile(contactsPath, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(data))
            }
        })
    })
}

const rewriteContacts = async (contacts) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

async function listContacts() {
    console.table(await fetchContacts())
}

async function getContactById(contactId) {
    const contacts = await fetchContacts()
    const contact = contacts.find(({ id }) => id === contactId)
    console.table(contact)
}

async function removeContact(contactId) {
    const contacts = await fetchContacts()
    const filteredContacts = contacts.filter(({ id }) => id !== contactId)
    await rewriteContacts(filteredContacts)
    console.table(filteredContacts)
}

async function addContact(name, email, phone) {
    const contacts = await fetchContacts()
    contacts.push({
        id: uuidv4(),
        name,
        email,
        phone,
    })
    await rewriteContacts(contacts)
    console.table(contacts)
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
