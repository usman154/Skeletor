const BASE_SCHEMA = {
  active: { type: Boolean, default: true },
};

const DEFAUTS = {
  strict: false,
  timestamps: true,
};

class Schema {
  constructor() {}

  define(name, schema, defaults, plugins = []) {
    return (mongoose) => {
      const object = new mongoose.Schema(
        { ...BASE_SCHEMA, ...schema },
        { ...DEFAUTS, ...defaults }
      );
      plugins.forEach((plugin) => {
        object.plugin(plugin);
      });

     return mongoose.model(name, object);
    };
  }
}

export default new Schema();
