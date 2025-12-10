import ComposantsDAO from "../dao/composantsDAO.js"

export default class ComposantsController {
  static async apiGetComposants(req, res, next) {
    const composantsPerPage = req.query.composantsPerPage ? parseInt(req.query.composantsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.nom) {
      filters.nom = req.query.nom
    }

    const { composantsList, totalNumComposants } = await ComposantsDAO.getComposants({
      filters,
      page,
      composantsPerPage,
    })

    let response = {
      composants: composantsList,
      page: page,
      filters: filters,
      entries_per_page: composantsPerPage,
      total_results: totalNumComposants,
    }
    res.json(response)
  }
  static async apiGetComposantById(req, res, next) {
    try {
      let id = req.params.id || {}
      let composant = await ComposantsDAO.getComposantByID(id)
      if (!composant) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(composant)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}