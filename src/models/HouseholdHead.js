const db = require("../config/database");
const { encrypt, decrypt } = require("../utils/encryption");

class HouseholdHead {
  static tableName = "household_heads";

  static async getAll(filters = {}) {
    const { program_id, location_id } = filters;

    let query = db(this.tableName)
      .select(
        "household_heads.*",
        "locations.county",
        "locations.sub_county",
        "programs.name as program_name"
      )
      .leftJoin("locations", "household_heads.location_id", "locations.id")
      .leftJoin("programs", "household_heads.program_id", "programs.id");

    // Apply program filter if provided
    if (program_id) {
      query = query.where("household_heads.program_id", program_id);
    }

    // Apply location filter if provided
    if (location_id) {
      query = query.where("household_heads.location_id", location_id);
    }

    const heads = await query.orderBy("household_heads.created_at", "desc");

    return heads.map((head) => ({
      ...head,
      phone_number: decrypt(head.phone_number)
    }));
  }

  static async getById(id) {
    const head = await db(this.tableName)
      .select(
        "household_heads.*",
        "locations.county",
        "locations.sub_county",
        "programs.name as program_name"
      )
      .leftJoin("locations", "household_heads.location_id", "locations.id")
      .leftJoin("programs", "household_heads.program_id", "programs.id")
      .where("household_heads.id", id)
      .first();

    if (head) {
      head.phone_number = decrypt(head.phone_number);
    }
    return head;
  }

  static async create(data) {
    const encryptedData = {
      ...data,
      phone_number: encrypt(data.phone_number)
    };

    const [head] = await db(this.tableName)
      .insert(encryptedData)
      .returning("*");

    head.phone_number = decrypt(head.phone_number);
    return head;
  }

  static async update(id, data) {
    const updateData = { ...data };
    if (data.phone_number) {
      updateData.phone_number = encrypt(data.phone_number);
    }

    const [updated] = await db(this.tableName)
      .where({ id })
      .update(updateData)
      .returning("*");

    if (updated) {
      updated.phone_number = decrypt(updated.phone_number);
    }
    return updated;
  }

  static async delete(id) {
    return db(this.tableName).where({ id }).del();
  }
}

module.exports = HouseholdHead;
