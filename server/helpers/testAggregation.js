// const models = require("../models/product");

// AGGREGATE
// const colors = ["red"];
// const sizes = [3];

// const matchQuery = () => {
//   const obj = {
//     $match: {}
//   };
//   if (sizes.length > 0) {
//     obj["$match"]["colors.sizes.size"] = { $in: sizes };
//   }
//   if (colors.length > 0) {
//     obj["$match"]["colors.color"] = { $in: colors };
//   }
//   return obj;
// };
// console.log(matchQuery());

// models.Product.aggregate(
//   [
//     {
//       $lookup: {
//         from: models.ProductColor.collection.name,
//         localField: "colors",
//         foreignField: "_id",
//         as: "colors"
//       }
//     },
//     // {
//     //   $unwind: {
//     //     path: "$colors",
//     //     preserveNullAndEmptyArrays: true
//     //   }
//     // },
//     // matchQuery(),
//     {
//       $addFields: {
//         subtitle: {
//           $concat: [
//             "$gender",
//             "'s ",
//             "$subcategory",
//             { $cond: [{ $eq: ["$category", "Shoes"] }, " " + "Shoes", ""] }
//           ]
//         }
//       }
//     },
//     {
//       $project: {
//         title: "$title",
//         subtitle: "$subtitle",
//         colors: "$colors",
//         // other: {
//         //   $setDifference: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [6]]
//         // },
//         colors: {
//           $filter: {
//             input: "$colors",
//             as: "c",
//             cond: {
//               $in: ["$$c.color", colors]
//             }
//           }
//           // sizes: {
//           //   cond: {
//           //     $in: ["$$size.size", sizes]
//           //   }
//           // }
//         }
//       }
//     },
//     matchQuery()
//     // {
//     //   $count: "count"
//     // }
//   ],
//   (err, result) => {
//     // console.log(
//     //   result.map(item => {
//     //     console.log(item.title, item.colors.length);
//     //     return item.colors.map(c => c.sizes.map(s => s.size));
//     //   })
//     // );
//     console.log(
//       "totla",
//       result.filter(item => {
//         const result = item.colors.filter(c => {
//           const colorSizes = c.sizes.map(s => s.size);
//           const res = sizes.some(size => colorSizes.includes(size));
//           return res;
//         });
//         item.colors = result;
//         return result.length > 0;
//       })
//     );
//     console.log(result.length);
//     return result;
//   }
// );
