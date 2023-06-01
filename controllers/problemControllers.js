const Problem = require('../models/Problem');

exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find({}).sort({ createdAt: -1 });
        res.status(200).json({ problems, "success": true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getProblemsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const problems = await Problem.find({ author: id }).sort({ createdAt: -1 });
        res.status(200).json({ problems, "success": true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);
        res.status(200).json({ problem, "success": true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createProblem = async (req, res) => {
    try {
        const { title, description, location, image } = req.body;

        const problem = await Problem.create({
            title,
            description,
            location,
            image,
            author: req.user._id,
        });
        await problem.save();
        res.status(201).json({ problem, "success": true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findByIdAndDelete(id);
        res.status(200).json({ problem, "success": true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, image } = req.body;
        const problem = await Problem.findByIdAndUpdate(id, {
            title,
            description,
            location,
            image,
        });
        res.status(200).json({ problem, "success": true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}