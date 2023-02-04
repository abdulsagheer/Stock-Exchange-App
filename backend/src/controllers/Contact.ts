// Importing Libraries
import expressAsyncHandler from "express-async-handler";

// Importing dependencies
import ContactModel from "../model/Company.model";

export const createContact = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    if (!name || !email) {
      res.json("Data not found");
    }

    const contact = await ContactModel.create({
      name,
      email,
    });
    await contact.save();
    res.json(contact);
    res.json({ message: "Created contact" });
  } catch (error: any) {
    res.json({ error: error.message });
  }
});
