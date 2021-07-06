const User = require('../models/User')
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')

module.exports = {
  async index(req, res) {
    try {
      if (req.user.nivel === 999 && req.user.acesso === 1) {
        const users = await User.findAll()
        return res.json(users)
      }
      return res.status(401).json({ error: 'Você não tem autorização' })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possivel mostrar os usuarios' })
    }
  },
  async store(req, res) {
    try {
      const data = req.body
      const userExist = await User.findOne({
        where: Sequelize.or({ email: data.email }, { cpf: data.cpf }),
      })
      if (userExist) {
        if (userExist.email === data.email) {
          return res.status(400).json({ error: 'E-mail já cadastrado' })
        }
        return res.status(400).json({ error: 'CPF já cadastrado' })
      }
      const user = await User.create(data)
      return res.json(user)
    } catch (err) {
      return res.json({ error: 'Não foi possivel criar o usuario' })
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      const userExist = await User.findOne({
        where: Sequelize.or({ email: data.email }, { cpf: data.cpf }),
      })
      if (userExist) {
        if (userExist.email === data.email) {
          return res.status(400).json({ error: 'E-mail já cadastrado' })
        }
        return res.status(400).json({ error: 'CPF já cadastrado' })
      }
      if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 8)
      }
      const user = await User.update(data, {
        where: { id },
      })

      return res.json({ message: 'Atualizado com sucesso!' })
    } catch (err) {
      return res.json({ error: 'Não foi possivel atualizar o usuario' })
    }
  },
  async destroy(req, res) {
    try {
      const { id } = req.params
      const user = await User.destroy({
        where: { id },
      })
      return res.json({ message: 'Deletado com sucesso!' })
    } catch (err) {
      return res.json({ error: 'Não foi possivel deletar o usuario' })
    }
  },
}
