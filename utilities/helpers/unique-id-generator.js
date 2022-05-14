import { v4 as uuidv4 } from 'uuid';

const UniqueIdGenerator = {
  getUniqueId: () => {
    return uuidv4();
    }
}

export default UniqueIdGenerator;
