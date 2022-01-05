import { Router } from 'express'
import {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
} from '../../../controlers/contacts'

const router = new Router()

router.post('/', validateCreate, addContact)

export default router
