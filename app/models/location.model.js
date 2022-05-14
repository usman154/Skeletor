import schema from './schema';
const schemaObject = {
    location_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true }
};
schema.definer('location', schemaObject);