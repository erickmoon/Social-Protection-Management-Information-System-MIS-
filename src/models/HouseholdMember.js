const db = require("../config/database");

class HouseholdMember {
  static tableName = "household_members";

  static async getAll() {
    return db(this.tableName)
      .select(
        "household_members.*",
        "household_heads.full_name as household_head_name"
      )
      .leftJoin(
        "household_heads",
        "household_members.household_head_id",
        "household_heads.id"
      )
      .orderBy("household_members.created_at", "desc");
  }

  static async getById(id) {
    return db(this.tableName)
      .select(
        "household_members.*",
        "household_heads.full_name as household_head_name"
      )
      .leftJoin(
        "household_heads",
        "household_members.household_head_id",
        "household_heads.id"
      )
      .where("household_members.id", id)
      .first();
  }

  static async getByHouseholdHead(headId) {
    return db(this.tableName)
      .where({ household_head_id: headId })
      .orderBy("full_name", "asc");
  }

  static async create(data) {
    const [member] = await db(this.tableName).insert(data).returning("*");
    return member;
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
}

module.exports = HouseholdMember;
