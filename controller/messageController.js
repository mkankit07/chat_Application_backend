const serviceMessage = require("../models/message.model")
const Joi = require("joi")
const bcrypt = require("bcrypt")


const SendMsg = async (req, res) => {
    const { from, to, message } = req.body
    try {
        let data = await serviceMessage.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from
        })
        console.log(data);
        if (data) {
            return res.status(201).json({ message: 'message add successfully', status: 201 })
        } else {
            return res.status(400).json({ message: 'message add faild', status: 400 })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Internal Server Error', status: 500 })
    }

}
const getMsg = async (req, res) => {
    const { from, to } = req.body
    try {
        const message = await serviceMessage.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 })
        console.log(message);
        let projectMessage;
        if (message) {
             projectMessage = message.map((msg) => {
                return { fromSelf: msg.sender.toString() === from, 'message': msg.message.text }
            });
        }
        return res.status(200).json({ message: 'access granted', data: projectMessage })

    } catch (err) {
        return res.status(500).json({ message: err.message || 'Internal Server Error', status: 500 })
    }
}

module.exports = { SendMsg, getMsg }