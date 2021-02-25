const router = require("express").Router();
const Note = require("../models/Note");
const { isAuthenticated } = require("../helpers/auth");

router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/newNote");
});

router.post("/notes/new", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please write a title" });
  }
  if (!description) {
    errors.push({ text: "Please write a description" });
  }
  if (errors.length > 0) {
    res.render("notes/newNote", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    await newNote.save();
    req.flash("success_msg", "Note added successfully");
    res.redirect("/notes");
  }
});

router.get("/notes", isAuthenticated, async (req, res) => {
  const notes = await Note.find().lean().sort({ date: "desc" });
  res.render("notes/listNotes", { notes });
});

router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render("notes/editNote", { note });
});

router.put("/notes/update/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    title,
    description,
  });
  req.flash("success_msg", "Note update successfully");
  res.redirect("/notes");
});

router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note delete successfully");
  res.redirect("/notes");
});

module.exports = router;
