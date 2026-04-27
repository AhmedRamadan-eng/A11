// Get one document
export const findOne = async ({
  model,
  filter = {},
  select = "",
  options = {}
}) => {
  let doc = model.findOne(filter);

  if (select) doc = doc.select(select);

  if (options.populate) doc = doc.populate(options.populate);

  return await doc;
};


// Get all documents
export const findAll = async ({
  model,
  filter = {},
  select = "",
  options = {}
}) => {
  let doc = model.find(filter);

  if (select) doc = doc.select(select);

  if (options.populate) doc = doc.populate(options.populate);

  return await doc;
};


// Update document
export const findoneAndUpdate = async ({
  model,
  filter = {},
  update = {},
  options = {}
}) => {
  return await model.findOneAndUpdate(filter, update, options);
};
//Delete docment 

export const findoneAndDelete = async ({
  model,
  filter = {},

}) => {
  return await model.findOneAndUpdate(filter);
}

// findbyid
export const findById= async ({
  model,
  id ,

}) => {
  return await model.findById(id);
}




//insertMany
export const insertMany = async ({
  model,
  data = [],

}) => {
  return await model.insertMany(data);
}


//insertone
export const insertOne= async ({
  model,
  data = {},

}) => {
  return await model.insertOne(data);
}




