'ues strict';

const express = require('express');

const router = express.Router();
const Categories = require('../models/categories/categories');
const categories = new Categories();


//routes for categories with callbacks

router.get('/', getCategories);
router.post('/', postCategories);
router.get('/:id', getCategory);
router.put('/:id', putCategories);
router.delete('/:id', deleteCategories);


//callback functions

/**
 *
 *
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object} all the categories in database
 */

function getCategories(request,response,next) {
  // expects an array of object to be returned from the model
  return categories.get()
    .then( data => {
      console.log('here');
      const output = {
        count: data.count,
        results: data.results,
      };
      console.log('got categories', output);
      response.status(200).json(output);
    })
    .catch(err=>console.log(err) );
}

/**
 *
 *
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object} the category with that id in database
 */
function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  return categories.get(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}

/**
 *
 *
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object} the new categories in database
 */
function postCategories(request,response,next) {
  // expects the record that was just added to the database
  return categories.create(request.body)
    .then( result => { 
      // console.log('this is in postcategory',result);
      return response.status(201).json(result);
    })
    .catch( err=>console.log(err) );
}

/**
 *
 *
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object} the updated categories in database
 */
function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  return categories.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}

/**
 *
 *
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object} the deleted category in database
 */
function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  return categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}


module.exports = router;
