const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Candidate = require("../models/candidate");

router.post("/vote", async (req, res) => {

    try {

        const { userId, candidateId } = req.body;

        const user = await User.findById(userId);

        if (user.hasVoted) {
            return res.send("You have already voted");
        }

        const candidate = await Candidate.findById(candidateId);

        candidate.votes += 1;

        await candidate.save();

        user.hasVoted = true;

        await user.save();

        res.send("Vote Successful");

    } catch (error) {

        res.send(error);

    }

});

module.exports = router;