//?If you want to run nodemon locally run the following:
//* npx nodemon app.js

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

const port = 3000;
//!MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//? The very important next function
app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//!Database
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//!Route handlers
//? Get all the tours
const getAllTours = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'Success',
    results: tours.length,
    data: { tours },
  });
};

//?Get tour from ID
const getSingleTourFromId = (req, res) => {
  //? Make the id from string to num using this:
  const id = req.params.id * 1;
  const singleTour = tours.find((tour) => tour.id === id);

  //*Error handling on fetching ID
  if (!singleTour) {
    return res.status(404).json({ status: 'Failure', message: 'Invalid ID' });
  }

  res.status(200).json({
    status: 'Success',
    data: { tour: singleTour },
  });
};

//?Create new tour
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'Success', data: { tours: newTour } });
    }
  );
};

//? Delete a tour
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({ status: 'Success', data: null });
};

//? Update a tour
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: { tour: '<Updated tour placeholder>' },
  });
};

//*OLD
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getSingleTourFromId);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getSingleTourFromId)
  .patch(updateTour)
  .delete(deleteTour);

//* Server start
app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});
