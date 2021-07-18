// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      if (!projects) {
        res.status(200).json([]);
      } else {
        res.status(200).json(projects);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Get all error' });
    });
});

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res
          .status(404)
          .json({ message: 'Project with the specified id does not exist' });
      } else {
        res.status(200).json(project);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Get id error' });
    });
});

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Name and description required' });
  } else {
    Projects.insert(req.body)
      .then((newProject) => {
        res.status(201).json(newProject);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Post error' });
      });
  }
});

router.put('/:id', (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Name and description required' });
  } else {
    Projects.update(req.params.id, req.body)
      .then((updatedProject) => {
        if (updatedProject) {
          return Projects.get(req.params.id);
        } else {
          res.status(404).json({
            message: 'The project with the specified id does not exist',
          });
        }
      })
      .then((updatedProject) => {
        res.status(200).json(updatedProject);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Put error' });
      });
  }
});

router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then((deletedProject) => {
      if (!deletedProject) {
        res.status(404).json({
          message: 'The project with the specified id does not exist',
        });
      } else {
        res.status(200).json();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Delete error' });
    });
});

router.get('/:id/actions', (req, res) => {
  Projects.get(req.params.id)
    .then((actions) => {
      if (!actions) {
        res.status(404).json({
          message: 'The project with the specified id does not exist',
        });
      } else {
        Projects.getProjectActions(req.params.id).then((actions) => {
          res.status(200).json(actions);
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Get actions error' });
    });
});

module.exports = router;
