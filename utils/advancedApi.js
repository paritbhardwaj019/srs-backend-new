export default class AdvancedAPI {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    ["page", "limit", "sort", "fields"].forEach(
      (prop) => delete queryObj[prop]
    );

    let queryObjStrEquivalent = JSON.stringify(queryObj);
    queryObjStrEquivalent = queryObjStrEquivalent.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.mongooseQuery = this.mongooseQuery.find(
      JSON.parse(queryObjStrEquivalent)
    );
    return this;
  }

  sort() {
    if (this.queryString.sort)
      this.mongooseQuery = this.mongooseQuery.sort(
        this.queryString.sort.replaceAll(",", " ")
      );
    else this.mongooseQuery = this.mongooseQuery.sort("price");

    return this;
  }

  project() {
    if (this.queryString.fields)
      this.mongooseQuery = this.mongooseQuery.select(
        this.queryString.fields.replaceAll(",", " ")
      );
    else this.mongooseQuery = this.mongooseQuery.select("-__v");

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
}
