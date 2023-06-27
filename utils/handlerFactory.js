import catchAsync from "../lib/catchAsync.js";
import AppError from "./appError.js";
import AdvancedAPI from "./advancedApi.js";

export const createOneWithoutResponse = (Model) =>
  catchAsync(async (req, res, next, postCreate) => {
    const doc = await Model.create(req.body);

    // Execute the postCreate callback if provided
    if (postCreate) {
      await postCreate(doc);
    }

    return doc;
  });

// Create
export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        [Model.collection.collectionName.slice(0, -1)]: doc,
      },
    });
  });

// Read all
export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const api = new AdvancedAPI(Model.find(), req.query)
      .filter()
      .sort()
      .project();
    const data = await api.mongooseQuery;

    res.json({
      status: "success",
      results: data.length,
      data: {
        [Model.collection.collectionName]: data,
      },
    });
  });

// Read one
export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.json({
      status: "success",
      data: {
        [Model.collection.collectionName.slice(0, -1)]: doc,
      },
    });
  });

// Update
export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.json({
      status: "success",
      data: {
        [Model.collection.collectionName.slice(0, -1)]: doc,
      },
    });
  });

// Delete
export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
