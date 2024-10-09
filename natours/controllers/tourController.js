const fs = require('fs');

//!Database
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`tour ID: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  }
  next();
};

//!Route Handlers
//? Get all the tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'Success',
    results: tours.length,
    data: { tours },
  });
};

//?Get tour from ID
exports.getSingleTour = (req, res) => {
  //? Make the id from string to num using this:
  const id = req.params.id * 1;
  const singleTour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'Success',
    data: { tour: singleTour },
  });
};

//?Create new tour
exports.createTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'Success', data: null });
};

//? Update a tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: { tour: '<Updated tour placeholder>' },
  });
};
