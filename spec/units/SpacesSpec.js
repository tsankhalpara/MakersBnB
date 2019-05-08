describe("Spaces", function() {
  var spaces;

  beforeEach(function() {
    spaces = new Spaces("name", "description", "price");
  });

  describe("name", function() {
    it("has a name", function() {
      expect(spaces.name).toEqual("name");
    });
  });

  describe("description", function() {
    it("has a description", function() {
      expect(spaces.description).toEqual("description");
    });
  });

  describe("price", function() {
    it("has a price", function() {
      expect(spaces.price).toEqual("price");
    });
  });

});
