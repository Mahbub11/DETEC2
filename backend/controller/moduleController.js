const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const db = require("../model/index");
const Vocabulary = db.vocabulary;
const Reading = db.reading;
const InteractiveReading = db.interactiveReading;
const Listening = db.listening;
const Writing = db.writing;
const Speaking = db.speaking;
const op = db.Sequelize.Op;
const {s3Delete } = require("../utils/s3Service");
// const reading = require("../model/reading");

exports.createVocabulary = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("Content must not be Empty", 400));
  }

  const vocabulary = {
    level: req.body.level,
    total_tested: req.body.total_tested,
    type: req.body.type,
    inner_type: req.body.inner_type,
    time: req.body.time,
    qa: req.body.qa,
  };

  // Save Tutorial in the database
  Vocabulary.create(vocabulary)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Data.",
      });
    });
});

exports.getVocabularyList = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    let data = null;
    if (id) {
      data = await Vocabulary.findByPk(id);
    } else {
      data = await Vocabulary.findAll();
    }

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      res.status(201).json({
        success: true,
        total: data.length,
        data,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.updateVocabulary = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await Vocabulary.findByPk(id);

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      const vocData = await Vocabulary.update(req.body, {
        where: { id: id },
      });

      res.status(201).json({
        success: true,
        vocData,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.deleteVoc = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Vocabulary.findByPk(id);
    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      await Vocabulary.destroy({
        where: { id: id },
      });
    }

    res.status(201).json({
      success: true,
      message: "Vocabulary Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Reading
exports.createReading = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("Content must not be Empty", 400));
  }

  const reading = {
    title: req.body.title,
    explain: req.body.explain,
    level: req.body.level,
    total_tested: req.body.total_tested,
    type: req.body.type,
    inner_type: req.body.inner_type,
    time: req.body.time,
    qa: req.body.qa,
  };

  Reading.create(reading)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Data.",
      });
    });
});

exports.getReading = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    let data = null;
    if (id) {
      data = await Reading.findByPk(id,{ include: ["interactivereadings"] });
    } else {
      data = await Reading.findAll({ include: ["interactivereadings"] });
    }

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      res.status(201).json({
        success: true,
        total: data.length,
        data,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.updateReading = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await Reading.findByPk(id);

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      const newData = await Reading.update(req.body, {
        where: { id: id },
      });

      res.status(201).json({
        success: true,
        newData,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});



exports.deleteReading = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Reading.findByPk(id);
    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      await Reading.destroy({
        where: { id: id },
      });
    }
    res.status(201).json({
      success: true,
      message: "Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Listening
exports.createListening = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("Content must not be Empty", 400));
  }

  const listening = {
    title: req.body.title,
    level: req.body.level,
    total_tested: req.body.total_tested,
    type: req.body.type,
    inner_type: req.body.inner_type,
    time: req.body.time,
    qa: req.body.qa,
  };

  Listening.create(listening)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Data.",
      });
    });
});

exports.getListening = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    let data = null;
    if (id) {
      data = await Listening.findByPk(id);
    } else {
      data = await Listening.findAll();
    }

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      res.status(201).json({
        success: true,
        total: data.length,
        data,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.updateListening = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await Listening.findByPk(id);

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      const newData = await Listening.update(req.body, {
        where: { id: id },
      });

      res.status(201).json({
        success: true,
        newData,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.deleteListening = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Listening.findByPk(id);
    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      await Listening.destroy({
        where: { id: id },
      });
    }
    res.status(201).json({
      success: true,
      message: "Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Writing
exports.createWriting = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("Content must not be Empty", 400));
  }

  const writing = {
    level: req.body.level,
    total_tested: req.body.total_tested,
    type: req.body.type,
    inner_type: req.body.inner_type,
    time: req.body.time,
    qa: req.body.qa,
    image: req.body.image,
  };

  Writing.create(writing)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Data.",
      });
    });
});

exports.getWriting = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    let data = null;
    if (id) {
      data = await Writing.findByPk(id);
    } else {
      data = await Writing.findAll();
    }

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      res.status(201).json({
        success: true,
        total: data.length,
        data,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.updateWriting = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await Writing.findByPk(id);

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      
      const newData = await Writing.update(req.body, {
        where: { id: id },
      });

      res.status(201).json({
        success: true,
        newData,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.deleteWriting = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Writing.findByPk(id);
    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
     await s3Delete(data.image,'duolingo').then(res=>{}).catch(err=>{
      return next(new ErrorHandler(err, 400));
      })
      await Writing.destroy({
        where: { id: id },
      });
    }
    res.status(201).json({
      success: true,
      message: "Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});


// Speaking
exports.createSpeaking = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("Content must not be Empty", 400));
  }



  const speaking = {
    level: req.body.level,
    total_tested: req.body.total_tested,
    type: req.body.type,
    inner_type: req.body.inner_type,
    time: req.body.time,
    qa: req.body.qa,
    image: req.body.image,
  };

 await Speaking.create(speaking)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Data.",
      });
    });
});

exports.getSpeaking = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    let data = null;
    if (id) {
      data = await Speaking.findByPk(id);
    } else {
      data = await Speaking.findAll();
    }

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      res.status(201).json({
        success: true,
        total: data.length,
        data,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.updateSpeaking = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await Speaking.findByPk(id);

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      // s3Delete(data.image,'duolingo').then(res=>{}).catch(err=>{
      //  console.log(err);

      //   return
      // })
      const newData = await Speaking.update(req.body, {
        where: { id: id },
      });

      res.status(201).json({
        success: true,
        newData,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.deleteSpeaking = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Speaking.findByPk(id);
    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      await Speaking.destroy({
        where: { id: id },
      });
    }
    res.status(201).json({
      success: true,
      message: "Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});



// interactive reading
exports.createInteractiveReading = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("Content must not be Empty", 400));
  }

  const reading = {
    rid: req.body.rid	,
    title: req.body.title,
    explain: req.body.explain,
    inner_type: req.body.inner_type,
    qa: req.body.qa,
  };

 const checkExist= await InteractiveReading.findOne({where:{rid: req.body.rid,inner_type: req.body.inner_type}})

 if(checkExist){
  return next(new ErrorHandler('Already Saved try Editing', 400));
 }else{
   await InteractiveReading.create(reading)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Data.",
      });
    });
 }

});


exports.updateInteractiveReading = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await InteractiveReading.findByPk(id);

    if (!data) {
      return next(new ErrorHandler("Id is invalid!", 400));
    } else {
      const newData = await InteractiveReading.update(req.body, {
        where: { id: id },
      });

      res.status(201).json({
        success: true,
        newData,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
