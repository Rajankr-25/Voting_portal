const express = require("express");
const router = express.Router();

const Candidate = require("../models/candidate");
const User = require("../models/user");

// ADD CANDIDATE

router.post("/addCandidate", async (req, res) => {

    try {

        const { name, party } = req.body;

        const newCandidate = new Candidate({
            name,
            party
        });

        await newCandidate.save();

        res.send("Candidate Added Successfully");

    } catch (error) {

        res.send(error);

    }

});


// GET ALL CANDIDATES

router.get("/candidates", async (req, res) => {

    const candidates = await Candidate.find();

    res.json(candidates);

});

// GET ALL VOTERS

router.get("/voters", async (req, res) => {

    try {

        const voters =
        await User.find({
            role: "user"
        });

        res.json(voters);

    }

    catch (error) {

        res.send(error);

    }

});

// DELETE CANDIDATE

router.delete("/deleteCandidate/:id", async (req, res) => {

    try {

        const candidateId = req.params.id;

        await Candidate.findByIdAndDelete(
            candidateId
        );

        res.send(
            "Candidate deleted successfully"
        );

    }

    catch (error) {

        res.send(error);

    }

});

// UPDATE CANDIDATE

router.put("/updateCandidate/:id", async (req, res) => {

    try {

        const candidateId =
        req.params.id;

        const { name, party } =
        req.body;

        await Candidate.findByIdAndUpdate(
            candidateId,
            {
                name,
                party
            }
        );

        res.send(
            "Candidate updated successfully"
        );

    }

    catch (error) {

        res.send(error);

    }

});

module.exports = router;