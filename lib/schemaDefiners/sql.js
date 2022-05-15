const BASE_SCHEMA = {
  active: { type: Boolean, default: true },
};

const DEFAUTS = {
  timestamps: true,
};

class Schema {
  constructor() {}

  define(name, schema, defaults = {}) {
    return (sequelize) => {
      const options = { ...DEFAUTS, ...defaults };
      return sequelize.define(name, schema, options);
    };
  }
}

export default new Schema();
