import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    date: {type: Date, default: Date.now()},
    author: {type: Schema.Types.ObjectId, ref: "User"},
    msg: String,
});

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const treeSchema = new Schema({
    position: {type: pointSchema, required: true},
    hauteur_totale: {type: Number, required: true, alias: "heigth"},
    circonf: {type: Number, get: v => v / Math.PI, alias: "diameter"},
    nom_complet: {type: String, alias: "specie"},

    value: Number,
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    name: String,
    isLocked: Boolean,
    buyHistory: [
        {date: Date, user: {type: Schema.Types.ObjectId, ref: "User"}},
    ],
    comments: {type: [commentSchema]},
    wikiLink: String,
});

const tree = mongoose.model("Tree", treeSchema, "arbustum");
const comment = mongoose.model("Comment", commentSchema);
const point = mongoose.model("Point", pointSchema);
module.exports = {tree, comment, point};

/** */
