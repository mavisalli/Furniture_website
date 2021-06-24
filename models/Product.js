const mongoose = require("mongoose");
const slugify = require('slugify');
const Schema = mongoose.Schema;


const ProductSchema = new Schema ({
  
    name: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true

    }, 
    description: {
        type: String,
        required: true
    },
    moreInfo: {
        type: String
    },
    color: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    },
      
});

ProductSchema.pre("validate", function(next){  //arrow func yapmadık cünkü this özelligi yok onda.
    this.slug = slugify(this.name, {
        lower: true,  // stringi kücük harfe cevirir
        strict: true  //özel karakterleri keser
    })
    next();
})

const Product = mongoose.model("Product", ProductSchema); 


module.exports= Product;
