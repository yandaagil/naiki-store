import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await retrieveData('users')
  const data = users.map((user: any) => {
    delete user.password
    return user
  })
  if (req.method === 'GET') {
    res.status(200).json({ status: true, statusCode: 200, message: 'success', data })
  } else if (req.method === 'PUT') {
    const { user }: any = req.query
    const { data } = req.body
    const token = req.headers.authorization?.split(' ')[1] || ''
    jwt.verify(token, process.env.NEXTAUTH_SECRET || '', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await updateData('users', user[1], data, (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, statusCode: 200, message: 'success' })
          } else {
            res.status(400).json({ status: false, statusCode: 400, message: 'failed' })
          }
        })
      } else {
        res.status(403).json({ status: false, statusCode: 403, message: 'forbidden' })
      }
    })
  } else if (req.method === 'DELETE') {
    const { user }: any = req.query
    const token = req.headers.authorization?.split(' ')[1] || ''
    jwt.verify(token, process.env.NEXTAUTH_SECRET || '', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await deleteData('users', user[1], (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, statusCode: 200, message: 'success' })
          } else {
            res.status(400).json({ status: false, statusCode: 400, message: 'failed' })
          }
        })
      } else {
        res.status(403).json({ status: false, statusCode: 403, message: 'forbidden' })
      }
    })
  }
}