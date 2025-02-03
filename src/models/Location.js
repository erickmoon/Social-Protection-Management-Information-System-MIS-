const db = require("../config/database");

class Location {
  static tableName = "locations";

  static async getAll(filters = {}) {
    const { county, sub_county } = filters;

    let query = db(this.tableName);

    // Apply county filter if provided
    if (county) {
      query = query.where("county", "ilike", `%${county}%`);
    }

    // Apply sub-county filter if provided
    if (sub_county) {
      query = query.where("sub_county", "ilike", `%${sub_county}%`);
    }

    return query.orderBy("created_at", "desc");
  }

  static async getById(id) {
    return db(this.tableName).where({ id }).first();
  }

  static async create(data) {
    const [location] = await db(this.tableName).insert(data).returning("*");
    return location;
  }

  static async update(id, data) {
    const [updated] = await db(this.tableName)
      .where({ id })
      .update(data)
      .returning("*");
    return updated;
  }

  static async delete(id) {
    return db(this.tableName).where({ id }).del();
  }

  static async getByCounty(county) {
    return db(this.tableName).where({ county }).orderBy("sub_county", "asc");
  }
}

module.exports = Location;
