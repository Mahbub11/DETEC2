const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const db = require("../model/index");
const StatDuolingo = db.statisticDuolingo;
const Reading = db.reading;
const Writing = db.writing;
const Listening = db.listening;
const Speaking = db.speaking;
const Vocabulary = db.vocabulary;
const Profile = db.profile;

exports.saveStatisticDuolingo = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  if (!data) {
    return next(new ErrorHandler("Id is invalid!", 400));
  }

  try {
    const statData = {
      user: req.body.user,
      qn: req.body.qn,
      level: req.body.level,
      type: req.body.type,
      inner_type: req.body.inner_type,
      time: req.body.time,
      result: req.body.result,
    };

    // increment the question attempt
    switch (req.body.type) {
      case 1:
        await Vocabulary.increment("total_tested", {
          where: { id: req.body.qn },
        });
        break;
      case 2:
        await Writing.increment("total_tested", { where: { id: req.body.qn } });
        break;
      case 3:
        await Reading.increment("total_tested", { where: { id: req.body.qn } });
        break;
      case 4:
        await Speaking.increment("total_tested", {
          where: { id: req.body.qn },
        });
        break;
      case 5:
        await Listening.increment("total_tested", {
          where: { id: req.body.qn },
        });
        break;

      default:
        break;
    }
    // Save DB
    await StatDuolingo.create(statData)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Data.",
        });
      });
  } catch (error) {
    console.error(error);
  }
});

exports.saveProfileInfo = catchAsyncError(async (req, res, next) => {
  const { id, s_email, image, phone, address, extra_info } = req.body;
  if (!id) {
    return next(new ErrorHandler("Id is invalid!", 400));
  }

  try {
    const userInfo = {
      s_email,
      avatar: image,
      phone,
      address,
      extra_info,
    };

    // Save DB
    await Profile.update(userInfo, {
      where: {
        user: id,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Data.",
        });
      });
  } catch (error) {
    console.error(error);
  }
});

exports.getProfileInfo = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    if (id) {
      await Profile.findByPk(id)
        .then((data) => {
          res.status(201).json({
            success: true,
            data,
          });
        })
        .catch((error) => {
          return next(new ErrorHandler("Id is invalid!", 400));
        });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.saveWord = catchAsyncError(async (req, res, next) => {
  const { flag, data } = req.body;
  if (!data) {
    return next(new ErrorHandler("Id is invalid!", 400));
  }

  try {
    //get profile data
    const profileData = await Profile.findOne({
      where: { user: req.userInfo.id },
    });
    const wordData = profileData.wordlist;

    if (wordData) {
      if (wordData[flag]) {
        let status = true;
        wordData[flag].map(async (val) => {
          if (val === data) {
            status = false;
            // return next(new ErrorHandler("Alredy added!", 200));
          }
        });

        if (status) {
          const studyData = {
            wordlist: {
              ...wordData,
              [flag]: [data, ...wordData[flag]],
            },
          };

          await Profile.update(studyData, {
            where: {
              user: req.userInfo.id,
            },
          });

          res.status(200).send({
            success: true,
            message: "Added to WordList",
          });
        } else {
          res.status(200).send({
            success: true,
            message: "Already Added!",
          });
        }

        // exist but flag container not added yet
      } else {
        const studyData = {
          wordlist: {
            ...wordData,
            [flag]: [data],
          },
        };

        await Profile.update(studyData, {
          where: {
            user: req.userInfo.id,
          },
        })
          .then((data) => {
            res.status(200).send({
              success: true,
              message: "Added to Wordlist",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Data.",
            });
          });
      }
    }
    // brand new
    else {
      const studyData = {
        wordlist: {
          ...wordData,
          [flag]: [data],
        },
      };

      await Profile.update(studyData, {
        where: {
          user: req.userInfo.id,
        },
      })
        .then((data) => {
          res.status(200).send({
            success: true,
            message: "Added to Wordlist",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Data.",
          });
        });
    }
  } catch (error) {
    console.error(error);
  }
});

exports.deleteWord = catchAsyncError(async (req, res, next) => {
  const { flag, data } = req.params;
  if (!data) {
    return next(new ErrorHandler("Id is invalid!", 400));
  }

  try {
    const profileData = await Profile.findOne({
      where: { user: req.userInfo.id },
    });
    const wordData = profileData.wordlist;
    if (wordData[flag]) {
      const newData = wordData[flag].filter((val) => val !== data);

      const studyData = {
        wordlist: {
          ...wordData,
          [flag]: newData,
        },
      };

      await Profile.update(studyData, {
        where: {
          user: req.userInfo.id,
        },
      })
        .then((response) => {
          res.status(200).send({
            success: true,
            message: "Deleted from List",
          });
        })
        .catch((err) => {
          return next(new ErrorHandler("Word remove Error", 400));
        });

      // exist but flag container not added yet
    } else {
      return next(new ErrorHandler("Word not found", 400));
    }
  } catch (error) {
    return next(new ErrorHandler("Error Occur", 400));
  }
});

exports.getWordList = catchAsyncError(async (req, res, next) => {
  try {
    await Profile.findOne({
      where: { user: req.userInfo.id },
    })
      .then((data) => {
        res.status(200).send({
          success: true,
          list: data.wordlist,
        });
      })
      .catch((err) => {
        return next(new ErrorHandler("Word Fatching Failed", 400));
      });
  } catch (error) {
    return next(new ErrorHandler("Word Fatching Failed", 400));
  }
});

exports.saveBookmark = catchAsyncError(async (req, res, next) => {
  const { qNo, type, inner_type } = req.body;
  if (!qNo) {
    return next(new ErrorHandler("Id is invalid!", 400));
  }

  try {
    //get profile data
    const profileData = await Profile.findOne({
      where: { user: req.userInfo.id },
    });
    const bookmarkData = profileData.bookmark;

    if (bookmarkData) {
      let status = true;
      bookmarkData.map((val) => {
        if (
          val.qNo === qNo &&
          val.type === type &&
          val.inner_type === inner_type
        ) {
          status = false;
          // return next(new ErrorHandler("Alredy added!", 200));
        }
      });

      if (status) {
        const studyData = {
          bookmark: [
            ...bookmarkData,
            { qNo: qNo, type: type, inner_type: inner_type },
          ],
        };

        await Profile.update(studyData, {
          where: {
            user: req.userInfo.id,
          },
        });

        res.status(200).send({
          success: true,
          message: "Added to Bookmark",
        });
      } else {
        const newData = bookmarkData.filter(
          (val) =>
            !(val.qNo === (qNo) && val.type === (type) &&
            val.inner_type === (inner_type))
        );

        if (newData) {
          const studyData = {
            bookmark: newData,
          };

          await Profile.update(studyData, {
            where: {
              user: req.userInfo.id,
            },
          });

          res.status(200).send({
            success: true,
            message: "Remove from Bookmarks",
          });
        }
      }
    }

    // brand new
    else {
      const studyData = {
        bookmark: [{ qNo: qNo, type: type, inner_type: inner_type }],
      };

      await Profile.update(studyData, {
        where: {
          user: req.userInfo.id,
        },
      })
        .then((data) => {
          res.status(200).send({
            success: true,
            message: "Added to Bookmark",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Data.",
          });
        });
    }
  } catch (error) {
    console.error(error);
  }
});

// exports.deleteBookmark = catchAsyncError(async (req, res, next) => {
//   const { qNo, type, inner_type } = req.params;
//   if (!qNo) {
//     return next(new ErrorHandler("Id is invalid!", 400));
//   }

//   try {
//     //get profile data
//     const profileData = await Profile.findOne({
//       where: { user: req.userInfo.id },
//     });
//     const bookmarkData = profileData.bookmark;

//     if (bookmarkData) {
//       const newData = bookmarkData.filter(
//         (val) =>
//           !(val.qNo === parseInt(qNo) && val.type === parseInt(type)) &&
//           val.inner_type === parseInt(inner_type)
//       );

//       if (newData) {
//         const studyData = {
//           bookmark: newData,
//         };

//         await Profile.update(studyData, {
//           where: {
//             user: req.userInfo.id,
//           },
//         });

//         res.status(200).send({
//           success: true,
//           message: "Delete from Bookmarks",
//         });
//       } else {
//         res.status(400).send({
//           success: true,
//           message: "Failed to delete!",
//         });
//       }
//     } else {
//       return next(new ErrorHandler("Bookmark Empty!", 200));
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

exports.getBookmarks = catchAsyncError(async (req, res, next) => {
  try {
    await Profile.findOne({
      where: { user: req.userInfo.id },
    })
      .then((data) => {
        res.status(200).send({
          success: true,
          list: data.bookmark,
        });
      })
      .catch((err) => {
        return next(new ErrorHandler("Bookmark Fatching Failed", 400));
      });
  } catch (error) {
    return next(new ErrorHandler("Bookmark Fatching Failed", 400));
  }
});

exports.getStatDuolingo = catchAsyncError(async (req, res, next) => {
  try {
    await StatDuolingo.findAll({
      where: { user: req.userInfo.id },
    })
      .then((data) => {
        res.status(200).send({
          success: true,
          list: data,
        });
      })
      .catch((err) => {
        return next(new ErrorHandler("Stat data Fatching Failed", 400));
      });
  } catch (error) {
    return next(new ErrorHandler("Stat data Fatching Failed", 400));
  }
});
