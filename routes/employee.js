const express = require('express');
const addEmployee_db = require('../models/employee_db');
const router = express.Router();

// get routes started at this point
router.get('/', (req, res)=>{
    addEmployee_db.find({}).then(employee=>{
        res.render('main', {employee:employee});
    }).catch(err=>{
        console.log(err);
    });
});

router.get('/employee_db/Search', (req, res)=>{
    res.render('Search', {query:""});
});
router.get('/employee_db', (req, res)=>{
    let searchQuery = {name : req.query.search};
    addEmployee_db.findOne(searchQuery)
    .then(query =>{
        res.render('Search', {query: query});
    }).catch(err=>{
        req.flash('error_msg', 'The wasnt found');
        console.log(err);
    });
});
router.get('/employee_db/addEmployee', (req, res)=>{
    res.render('addEmployee');
});
router.get('/main/:id', (req, res)=>{
    let employee_edit_info = {_id: req.params.id};
    addEmployee_db.findOne({employee_edit_info}).then(employee=>{
        res.render('/main', {employee: employee});
    }).catch(error=>{
        console.log(error);
    });
});
// get routes end at this point

// post routes started at this point
router.post('/employee_db/addEmployee', (req, res)=>{
    let empolyee_info = {
        name : req.body.employee_name,
        designation : req.body.employee_designation,
        salary : req.body.employee_salary
    };
    addEmployee_db.create(empolyee_info)
    .then(employee=>{
        req.flash('success_msg', 'New employee was added successfully');
        res.redirect('/');
    }).catch(err=>{
        req.flash('error_msg', 'Cant add Employee information');
        console.log(err);
    });
});

router.delete('/:id', (req, res)=>{
    let delete_employee = {
        _id: req.params.id
    };
    addEmployee_db.deleteOne(delete_employee).then(employee=>{
        req.flash('success_msg', 'The employee information has been deleted successfully');
        res.redirect('/');
    }).catch(err=>{
        req.flash('error_msg', 'The employee couldnt delete from database');
        console.log(err);
    });
});
// post routes ended at this point

// put routes starts at this point
router.put('/:id', (req, res)=>{
    let update_employee_query = {
        _id: req.params.id
    };
    addEmployee_db.updateOne(update_employee_query, {$set: {
        name: req.body.employee_edit_name,
        designation: req.body.employee_edit_designation,
        salary: req.body.employee_edit_salary
    }}).then(employee=>{
        req.flash('success_msg', 'The employee information edited successfully');
        res.redirect('/');
    }).catch(err=>{
        req.flash('error_msg', 'There is sth wrong with editing employee information');
        console.log(err);
    });
});
// put routes ended at this point

module.exports = router;