import mongoose from 'mongoose';
const BASE_SCHEMA = {
    active: { type: Boolean, default: true }
}

const DEFAUTS = {
    strict: false,
    timestamps: true
}

class Schema{

    constructor(){}

    definer(name, schema, defaults, plugins = []) {
        const object = new mongoose.Schema(
            { ...BASE_SCHEMA, ...schema },
            { ...DEFAUTS, ...defaults }
        );
        plugins.forEach(plugin => {
            object.plugin(plugin)
        });
        
        mongoose.model(name, object);
    }
}

export default new Schema;