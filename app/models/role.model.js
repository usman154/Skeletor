import schema from './schema';
const schemaObject = {
    role_id : { type: String, required: true, unique: true},
    name : { type: String, required: true },
    permissions : { type: Array, required: true }
};
schema.definer('role', schemaObject);