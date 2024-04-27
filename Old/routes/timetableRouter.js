const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,    
    Studenttimetable,
    AddnewClasstime,
    ManagerTimetable,
    AlltimetableData,
    UpdateTimetable,
    getOneTimetableData,
    deleteTimetableData
} = require('../controllers/timetableController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.get('/', test)
router.get('/Student/Timetable', Studenttimetable);
router.get('/Manager/Timetable',   AlltimetableData);
router.post('/Manager/Timetable/AddnewClasstime', AddnewClasstime);
router.put('/Manager/UpdateT/:id', UpdateTimetable);
router.get('/Manager/Timetable/:id', getOneTimetableData);
router.delete('/Manager/DeleteTimetable/:id', deleteTimetableData);


module.exports = router;