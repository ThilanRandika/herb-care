const TimetableModel = require('../models/AddnewClasstime');

const test = (req, res) => {
    res.json('test is working')
}

const Studenttimetable = (req, res) => {
    TimetableModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
}


const AlltimetableData = (req, res) => {
    TimetableModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

const getOneTimetableData = (req, res) => {
    const id =req.params.id;
    TimetableModel.findById({_id:id})
    .then(timetabledata=>res.json(timetabledata))
    .catch(err=>res.json(err));

}

const deleteTimetableData = (req, res) => {
    const { id } = req.params;
    TimetableModel.findByIdAndDelete({_id:id})
    
    .then(timetabledata => {
        if (!timetabledata) {
            return res.status(404).json({ error: 'Timetable data not found' });
        }
        res.json({ message: 'Timetable data deleted successfully', timetabledata });
    })
    .catch(err => 
        res.status(500).json({ error: 'Failed to delete timetable data', err })
    );

}
const AddnewClasstime = (req, res) => {
    TimetableModel.create(req.body)
    .then((data)=>{
        res.status(201).json({ message: 'Timetable data added successfully', data });
    })


    .catch((err)=>{
    res.json(err);

    })}

 const UpdateTimetable = (req, res) => {
    const id = req.params.id; // Corrected to directly use req.params.id
    const { date, Class_ID, startTime, endTime, grade, subject, teacher, hall, price, managerId, addedDate } = req.body;

    
   
    TimetableModel.findByIdAndUpdate(id,req.body) // To return the updated document
        .then(timetabledata => res.json(timetabledata))
        .catch(err => {
            console.error('Error updating document:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
 

module.exports = {
    test,
    Studenttimetable,
    AddnewClasstime,
    AlltimetableData,
    UpdateTimetable,
    getOneTimetableData,
    deleteTimetableData 
    
}