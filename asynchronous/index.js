const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find the breed you asked for.');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not retrieve breed image');
      resolve('successful');
    });
  });
};

//* The async & await way
const getDogPic = async () => {
  try {
    const readData = await readFilePromise(`${__dirname}/dog.txt`);
    const apiResult = await superagent.get(`https://dog.ceo/api/breed/${readData}/images/random`);
    await writeFilePromise('dog-img.txt', apiResult.body.message);
    console.log('Here is a pic of a random pupper');
  } catch (err) {
    console.log(err);
  }
};
getDogPic();

//* Get multiple pics
const getMultipleDogPics = async () => {
  try {
    const readData = await readFilePromise(`${__dirname}/dog.txt`);
    const firstRes = await superagent.get(`https://dog.ceo/api/breed/${readData}/images/random`);
    const secondRes = await superagent.get(`https://dog.ceo/api/breed/${readData}/images/random`);
    const thirdRes = await superagent.get(`https://dog.ceo/api/breed/${readData}/images/random`);
    const allRes = await Promise.all([firstRes, secondRes, thirdRes]);
    const picsResult = allRes.map((e) => e.body.message);
    await writeFilePromise('multidog-img.txt', picsResult.join('\n'));
  } catch (e) {
    console.log(e);
  }
};
getMultipleDogPics();
//?Modularized functions & better structure than callback hell
// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => superagent.get(`https://dog.ceo/api/breed/${data}/images/random`))
//   .then((res) => writeFilePromise('dog-img.txt', res.body.message))
//   .then(() => console.log('Here is a random pupper'))
//   .catch((err) => console.log(err.message));

//? Callback hell version
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('Here is a random pupper');
//       });
//     })
//     .catch((err) => console.log(err.message));
// });
