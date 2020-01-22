exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: 12345678912345678,
          make: "Tesla",
          model: "Cybertruck",
          mileage: 652
        },
        {
          vin: 12345398712345678,
          make: "Toyota",
          model: "Corolla",
          mileage: 65232,
          title_status: "Clean"
        },
        {
          vin: 12345328194325678,
          make: "Jeep",
          model: "Wrangler",
          mileage: 621832,
          title_status: "Salvage"
        }
      ]);
    });
};