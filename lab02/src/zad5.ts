interface Schema {
  [key: string]: string;
}

const obj = {
  name: "Abece",
  salary: 123,
};

function validateObject<T extends object>(obj: T, schema: Schema): boolean {
  for (const key in schema) {
    if (!(key in obj)) {
      return false;
    }

    const expectedType = schema[key].toLowerCase();
    const actualType = typeof (obj as any)[key];

    if (actualType !== expectedType) {
      return false;
    }
  }

  return true;
}

const schema = {
  name: "string",
  salary: "number",
};

console.log(validateObject(obj, schema));

const invalidObj = {
  name: 123,
  salary: "abc",
};

console.log(validateObject(invalidObj, schema));
