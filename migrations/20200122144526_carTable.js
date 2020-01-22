exports.up = function(knex) {
    return knex.schema.createTable("cars", tbl => {
      tbl.increments("car_id");
      tbl
        .integer("vin", 20)
        .notNullable()
        .unique()
        .index();
      tbl
        .string("make")
        .notNullable()
        .index();
      tbl
        .string("model")
        .notNullable()
        .index();
      tbl
        .integer("mileage")
        .notNullable()
        .index();
      tbl.string("trans_type", 128).index();
      tbl.string("title_status", 128).index();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
  };