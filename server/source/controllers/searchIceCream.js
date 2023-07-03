const { IceCream } = require("../database");
const { Op } = require("sequelize");

const Fuse = require("fuse.js");

const searchIceCream = async (searchTerm) => {
    const searchByNameOrFlavor = await IceCream.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${searchTerm}%` } },
                { flavors: { [Op.iLike]: `%${searchTerm}%` } },
            ],
        },
    });

    // return searchByNameOrFlavor;

    const fuseOptions = {
        keys: ['name', 'flavors'],
        threshold: 0.2,
        mode: "matchAll",
        includeScore: true,
        shouldSort: true,
        findAllMatches: true,
        distance: 100,
        ignoreLocation: true,
        minMatchCharLength: 1
      };
    
      const fuse = new Fuse(searchByNameOrFlavor, fuseOptions);
      const results = fuse.search(searchTerm);
      const searchResults = results.map((result) => result.item);


   return searchResults;
};

module.exports = searchIceCream;


