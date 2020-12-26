const mongoose = require('mongoose');
const pino = require("pino");
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const ClassSchema = new mongoose.Schema({
    title: String,
    description: String,
    level: String,
    datetime: Date,
    materialLink: String,
    classLink: String,
    active: { type: Boolean, default: true },
    teacherId: String,
    students: [String]
});

const Class = mongoose.model('Class', ClassSchema);

const findAllBy = query => {
    logger.info(`Fetching all Classes by ${JSON.stringify(query)}`);
    return Class.find(query);
};

const findAllAvailableFor = studentId => {
    logger.info(`Fetching all classes available for student ${studentId}`);
    return Class.find({ active: true, students: { $nin: [studentId] } });
};

const findAllByIds = ids => {
    if (!ids) {
        return Promise.resolve([]);
    }

    logger.info(`Fetching all classes available by ids ${ids}`);
    return Class.find({ _id: { $in: ids } });
};

const register = object => {
    const aClass = new Class(object);
    logger.info(`Registering Class ${aClass.title}`);
    return aClass.save();
};

const remove = id => {
    logger.info(`Removing Class with id ${id}`);
    return Class.updateOne({ _id: id }, { $set: { active: false } });
};

const assignTeacher = (classId, teacherId) => {
    logger.info(`Assigning class with id ${classId} to teacher with id ${teacherId}`);
    return Class.updateOne({ _id: classId }, { $set: { teacherId } });
};

const removeAllBy = query => {
    logger.warn(`Removing all Classes by ${JSON.stringify(query)}`);
    return Class.deleteMany(query);
};

module.exports = {
    findAllBy,
    findAllAvailableFor,
    findAllByIds,
    register,
    assignTeacher,
    remove,
    removeAllBy,
};