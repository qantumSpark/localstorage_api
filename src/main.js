import * as api from "./api.js";

let item1 = {
  name: "Révolution",
  segments : [
    {mesures:20, base: 4, tempo: 160},
    {mesures:30, base: 3, tempo: 120},
    {mesures:30, base: 3, tempo: 120}
  ]
}
let item2 = {
  name: "Racails",
  segments : [
    {mesures:20, base: 4, tempo: 160},
    {mesures:30, base: 3, tempo: 120}
  ]
}

//api.newCollection("Partitions")


api.addItem("Partitions", item2)

//api.updateItem("Partitions", "TWFudSBkYW5zIGwnY3Vs", newItem)

//api.deleteItem("Partitions", "TWFudSBkYW5zIGwnY3Vs")