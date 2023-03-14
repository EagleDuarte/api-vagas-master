import { Request, Response, NextFunction, response } from 'express'

export const createCandidateValidator = (req: Request, res: Response, next: NextFunction) => {

  try {
    const { nome, username, senha } = req.body

    if (!nome) return res.status(400).send({
      ok: false,
      message: "Name not provided!"
    })

    if (!username) return res.status(400).send({
      ok: false,
      message: "Username not provided!"
    })

    if (!senha) return res.status(400).send({
      ok: false,
      message: "Password not provided!"
    })

    next()

  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString()
    })
  }
  
}