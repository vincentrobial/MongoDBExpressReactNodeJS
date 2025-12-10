import { ObjectId } from "mongodb"
let composants

export default class ComposantsDAO {
  static async injectDB(conn) {
    if (composants) {
      return
    }
    try {
      composants = await conn.db(process.env.RESTPILOSSI_NS || "pilossi").collection("composants")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in composantsDAO: ${e}`,
      )
    }
  }

  static async getComposants({
    filters = null,
    page = 0,
    composantsPerPage = 20,
  } = {}) {
    let query = {}
    if (filters) {
      if ("nom" in filters) {
        // Use regex search as fallback if text index doesn't exist
        query = { "nom": { $regex: filters["nom"], $options: "i" } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    try {
      cursor = await composants
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { composantsList: [], totalNumComposants: 0 }
    }

    const displayCursor = cursor.limit(composantsPerPage).skip(composantsPerPage * page)

    try {
      const composantsList = await displayCursor.toArray()
      const totalNumComposants = await composants.countDocuments(query)

      return { composantsList, totalNumComposants }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { composantsList: [], totalNumComposants: 0 }
    }
  }
  static async getComposantByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$composant_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await composants.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getComposantByID: ${e}`)
      throw e
    }
  }

}