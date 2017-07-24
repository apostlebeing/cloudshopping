const express = require('express');
const router = express.Router();
const mongojs = require('mongojs')
const db = mongojs('mongodb://sean:snowball@ds161262.mlab.com:61262/mycloudshoppinglist_sean', ['tasks'])

//GET ALL TASKS
router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err)
        }
        res.json(tasks)
    })
});

//GET SINGLE TASK
router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err)
        }
        res.json(task)
    })
});

//SAVE TASK
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.item || !task.price) {
        res.status(418);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
    }
});

//DELETE TASK
router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err)
        }
        res.json(task)
    });
});

//UPDATE TASK
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};

    if (task.item) {
        updTask.item = task.item;
    }
    if (task.price) {
        updTask.price = task.price;
    }

    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {

        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, {}, function (err, task) {
            if (err) {
                res.send(err)
            }
            res.json(task)
        });
    }
});


module.exports = router;