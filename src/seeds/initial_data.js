const { encrypt } = require("../utils/encryption");
require("dotenv").config();

exports.seed = async function (knex) {
  try {
    // Clean the tables
    await knex("household_members").del();
    await knex("household_heads").del();
    await knex("locations").del();
    await knex("programs").del();

    // Insert programs
    const programIds = await knex("programs")
      .insert([
        {
          name: "Cash Transfer Program",
          description: "Monthly cash support for vulnerable households",
          budget: 1000000,
          start_date: new Date("2025-01-01"),
          is_active: true
        },
        {
          name: "Food Security Initiative",
          description: "Food assistance program",
          budget: 500000,
          start_date: new Date("2025-01-01"),
          is_active: true
        },
        {
          name: "Education Support",
          description: "School fees and supplies support",
          budget: 750000,
          start_date: new Date("2025-02-01"),
          is_active: true
        },
        {
          name: "Healthcare Access",
          description: "Medical coverage for vulnerable families",
          budget: 1200000,
          start_date: new Date("2025-01-15"),
          is_active: true
        },
        {
          name: "Emergency Relief",
          description: "Immediate assistance for crisis-affected families",
          budget: 300000,
          start_date: new Date("2025-01-01"),
          is_active: true
        }
      ])
      .returning("id");

    // Insert locations
    const locationIds = await knex("locations")
      .insert([
        {
          county: "Nairobi",
          sub_county: "Westlands",
          location: "Parklands",
          sub_location: "Spring Valley",
          ward: "Parklands/Highridge"
        },
        {
          county: "Mombasa",
          sub_county: "Nyali",
          location: "Frere Town",
          sub_location: "Kongowea",
          ward: "Frere Town"
        },
        {
          county: "Kisumu",
          sub_county: "Kisumu Central",
          location: "Milimani",
          sub_location: "Railway",
          ward: "Milimani"
        },
        {
          county: "Nakuru",
          sub_county: "Nakuru Town East",
          location: "Biashara",
          sub_location: "Lake View",
          ward: "Biashara"
        },
        {
          county: "Eldoret",
          sub_county: "Turbo",
          location: "Huruma",
          sub_location: "Riverside",
          ward: "Huruma"
        }
      ])
      .returning("id");

    // Insert household heads
    const headIds = await knex("household_heads")
      .insert([
        {
          full_name: "John Doe",
          id_number: "ID001",
          phone_number: encrypt("+254700000001"),
          location_id: locationIds[0].id,
          program_id: programIds[0].id,
          gender: "Male",
          date_of_birth: new Date("1980-01-01")
        },
        {
          full_name: "Jane Smith",
          id_number: "ID002",
          phone_number: encrypt("+254700000002"),
          location_id: locationIds[1].id,
          program_id: programIds[1].id,
          gender: "Female",
          date_of_birth: new Date("1985-01-01")
        },
        {
          full_name: "Peter Kamau",
          id_number: "ID003",
          phone_number: encrypt("+254700000003"),
          location_id: locationIds[2].id,
          program_id: programIds[2].id,
          gender: "Male",
          date_of_birth: new Date("1975-06-15")
        },
        {
          full_name: "Mary Wanjiku",
          id_number: "ID004",
          phone_number: encrypt("+254700000004"),
          location_id: locationIds[3].id,
          program_id: programIds[3].id,
          gender: "Female",
          date_of_birth: new Date("1982-03-20")
        },
        {
          full_name: "James Omondi",
          id_number: "ID005",
          phone_number: encrypt("+254700000005"),
          location_id: locationIds[4].id,
          program_id: programIds[4].id,
          gender: "Male",
          date_of_birth: new Date("1978-11-30")
        }
      ])
      .returning("id");

    // Insert household members
    await knex("household_members").insert([
      {
        full_name: "James Doe",
        age: 15,
        gender: "Male",
        relationship: "Son",
        household_head_id: headIds[0].id,
        date_of_birth: new Date("2010-01-01"),
        is_student: true
      },
      {
        full_name: "Sarah Smith",
        age: 12,
        gender: "Female",
        relationship: "Daughter",
        household_head_id: headIds[1].id,
        date_of_birth: new Date("2013-01-01"),
        is_student: true
      },
      {
        full_name: "Michael Kamau",
        age: 8,
        gender: "Male",
        relationship: "Son",
        household_head_id: headIds[2].id,
        date_of_birth: new Date("2017-05-20"),
        is_student: true
      },
      {
        full_name: "Grace Wanjiku",
        age: 16,
        gender: "Female",
        relationship: "Daughter",
        household_head_id: headIds[3].id,
        date_of_birth: new Date("2009-07-15"),
        is_student: true
      },
      {
        full_name: "Kevin Omondi",
        age: 10,
        gender: "Male",
        relationship: "Son",
        household_head_id: headIds[4].id,
        date_of_birth: new Date("2015-04-10"),
        is_student: true
      }
    ]);

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed error:", error);
    throw error;
  }
};
